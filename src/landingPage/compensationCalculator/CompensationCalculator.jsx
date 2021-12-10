import React, { useState, useEffect } from 'react';
import ResultsView from './resultsView/ResultsView';
import {
    GetSalaryPerDay,
    MinInsuranceDuration,
    MaxInsuranceDuration,
    MinEmployerCompensationDay,
    MaxEmployerCompensationDay,
} from '../../services/services';

import style from './CompensationCalculator.module.css';

function CompensationCalculator() {
    const [form, setForm] = useState({
        days: "",
        salary: "",
        tuberculosis: false
    });
    const [maxDaysOfSickLeave, setMaxDaysOfSickLeave] = useState(MinInsuranceDuration);
    const [salaryPerDay, setSalaryPerDay] = useState(0);
    const [employerCompensation, setEmployerCompensation] = useState(0);
    const [insuranceCompensation, setInsuranceCompensation] = useState(0);
    const [employerCompensationDayCount, setEmployerCompensationDayCount] = useState(0);
    const [insuranceCompensationDayCount, setInsuranceCompensationDayCount] = useState(0);
    const [sumOfCompensations, setSumOfCompensations] = useState(0);
    const [sumOfDays, setSumOfDays] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        if (form.days.length === 0) {
            setSumOfDays(0);
            setSalaryPerDay(0);
            setEmployerCompensation(0);
            setInsuranceCompensation(0);
            setEmployerCompensationDayCount(0);
            setInsuranceCompensationDayCount(0);
        }
        setSumOfCompensations(insuranceCompensation + employerCompensation);
        setMaxDaysOfSickLeave(form.tuberculosis ? MaxInsuranceDuration : MinInsuranceDuration);
        setErrorMessage(form.days > maxDaysOfSickLeave
            ? `The maximum duration of one insurance event is ${maxDaysOfSickLeave} days`
            : null
        )
    }, [form, maxDaysOfSickLeave, insuranceCompensation, employerCompensation]);
    
    const onChangeHandler = (name) => (e) => {
        setForm({
            ...form,
            [name]:
                name === "tuberculosis"
                    ? e.target.checked
                    : e.target.value.length > 0
                        ? parseFloat(e.target.value)
                        : e.target.value
        });
    };
    
    const calculateCompensation = () => {
        if (errorMessage) return;
        if(form.days < MinEmployerCompensationDay) return setErrorMessage(`The compensation from the ${MinEmployerCompensationDay}th day!`);

        setSumOfDays(form.days);
        setSalaryPerDay(form.salary > 0 ? GetSalaryPerDay(form.salary) : 0);
        
        if (form.days > 0) {
            if (form.days >= MinEmployerCompensationDay &&
                form.days <= MaxEmployerCompensationDay) {
                setInsuranceCompensation(0);
                setInsuranceCompensationDayCount(0);
                setEmployerCompensationDayCount(form.days - (MinEmployerCompensationDay - 1));
                setEmployerCompensation((form.days - (MinEmployerCompensationDay - 1)) * GetSalaryPerDay(form.salary));
            } else if (form.days > MaxEmployerCompensationDay) {
                setEmployerCompensation(
                    (form.days - (MinEmployerCompensationDay - 1) + MaxEmployerCompensationDay - form.days) * GetSalaryPerDay(form.salary)
                );
                setEmployerCompensationDayCount(form.days - (MinEmployerCompensationDay - 1) + MaxEmployerCompensationDay - form.days)
                const $daysInsurance = form.days - MaxEmployerCompensationDay;
                setInsuranceCompensationDayCount($daysInsurance);
                setInsuranceCompensation(
                    $daysInsurance * ((GetSalaryPerDay(form.salary) * 70) / 100)
                );
            }
        }
    };
    return (
        <>
            <div className={style.calculator}>
                <h3>Compensation Calculator</h3>
                <div className={style.fieldGroup}>
                    <div className={style.field}>
                        <label> Average Income
                            <input
                                type="number"
                                name="salary"
                                value={form.salary}
                                onChange={onChangeHandler("salary")}
                            />
                        </label>
                    </div>

                    <div className={style.field + " " + style.days}>
                        <label>Days on sick-leave
                            <input
                                type="number"
                                name="days"
                                value={form.days}
                                onChange={onChangeHandler("days")}
                            />
                        </label>
                        <div className={`${style.errorMessage + ' ' + (errorMessage ? style.show : '')}`}>{errorMessage}</div>
                    </div>
                </div>
                <div className={style.checkboxGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="tuberculosis"
                            value={form.tuberculosis}
                            onChange={onChangeHandler("tuberculosis")}
                        />
                        <span className={style.checkmark}></span>
                        I have tubercolosis
                    </label>
                </div>

                <button 
                    className={style.button} 
                    onClick={calculateCompensation} type="button"
                >
                    Calculate
                </button>
            </div>

            <div>
                <div className={style.calculatedView}>
                    <ResultsView
                        title="The employer compensates"
                        salaryPerDay={salaryPerDay}
                        compensation={employerCompensation}
                        daysCount={employerCompensationDayCount}
                    />
                    <ResultsView 
                        title="Health Insurance compensates"
                        salaryPerDay={salaryPerDay}
                        compensation={insuranceCompensation}
                        daysCount={insuranceCompensationDayCount}
                    />
                </div>
                <h5 className={style.calculatedSumTitle}>
                    Compensation total for {sumOfDays} days (net)
                </h5>
                <h2 className={style.calculatedSum}>{sumOfCompensations.toFixed(2)}€</h2>
            </div>
        </>
    )
}

export default CompensationCalculator;
