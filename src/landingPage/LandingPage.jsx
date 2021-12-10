import React from 'react';
import CompensationCalculator from './compensationCalculator/CompensationCalculator';
import style from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={style.content}>
            <div className={style.contentLeft}>
                <h1>Quam Tristique Condimentum</h1>
                <p>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. 
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. <a href="/some-url" className={style.link}>Curabitur blandit</a> tempus porttitor. 
                    Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.
                </p>
                <div className={style.contentLeftBottom}>
                    <div className={style.contentDescription}>
                        <h2>Fringilla Euismod Adipiscing Ipsum</h2>
                        <p>
                            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. 
                            Aenean lacinia bibendum nulla sed.
                        </p>
                    </div>
                    <div className={style.image} />
                </div>
                <ul className={style.list}>
                    {['Tellus Ullamcorper Inceptos', 'Magna Condimentum', 'Mattis Tristique', 'Pharetra Pellentesque Dapibus', 'Aenean Inceptos', 'Parturient Bibendum'].map((item, index) => (
                        <li key={index} className={`${index === 2 || index === 3 ? style.active : ''}`} >{item}</li>
                    ))}
                </ul>

            </div>

            <div className={style.contentRight}>
              <CompensationCalculator />
            </div>
        </div>
    )
}

export default LandingPage;
