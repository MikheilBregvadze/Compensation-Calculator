import React from 'react';
import style from './ResultsView.module.css';

function ResultsView({ title, salaryPerDay, compensation, daysCount }) {
    return (
        <div className={style.item}>
            <div className={style.daysCount}>
                <p>{title}</p>
                <h4>{daysCount} days</h4>
            </div>
            <h2>{compensation.toFixed(2)}€</h2>
            <p className={style.allowance}>Daily allowance {salaryPerDay.toFixed(2)}€</p>
        </div>
    )
}

export default ResultsView
