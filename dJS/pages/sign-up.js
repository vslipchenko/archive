import Hat from "../components/hat";
import Styles from "../components/styles";
import fetch from "isomorphic-unfetch";
import {env} from "../environment";
import React from "react";

export default function SignUp() {
    const isValidForm = (form) => {
        for (const key of form.keys()) {
            const isValidField = document.querySelector(`input#${key}`).reportValidity();
            if (!isValidField) return false;
        }
        return true;
    };

    const signUp = async (e) => {
        const messageBox = document.querySelector('#messages');
        messageBox.textContent = '';
        const form = new FormData(document.querySelector('#form'));

        if (isValidForm(form)) {
            const username = document.querySelector('#username').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const button = e.target;

            button.classList.add('loading');

            const res = await fetch(`${env.usersApi}?username=${username}&email=${email}&password=${password}&action=sign-up`);
            const is = await res.json();

            button.classList.remove('loading');

            if (!is.success) {
                messageBox.textContent = 'such username or email already taken'
            } else {
                messageBox.textContent = 'success';
                button.textContent = 'sign in';
                button.onclick = () => window.location.replace('/sign-in');
            }
        }
    };

    return (
        <>
            <Hat title={'Sign Up'}/>

            <main>
                <form action="" id={'form'} autoComplete="off">
                    <h1>sign up</h1>
                    <div className={'content'}>
                        <input id={'username'} type="text" name={'username'} className={'field'} placeholder={'username'} required={true}/>
                        <input id={'email'} type="email" name={'email'} className={'field'} placeholder={'email'} required={true}/>
                        <input id={'password'} type="password" className={'field'} name={'password'} placeholder={'password'} required={true}/>
                        <div id={'messages'} className={'messages'}/>
                    </div>
                    <div className={'actions'}>
                        <button type={'button'} className={'submit-action'} onClick={signUp}>submit</button>
                    </div>
                </form>
            </main>

            <Styles/>

            <style jsx>{`
            h1 {
                margin: 30px 0;
                font-size: 25px;
                padding-left: 20px;
                border-left: 5px solid darkorange;
            }
            
            main {
                background-image: url("image/sign-up.jpg");
                
                align-items: center;
                justify-content: center;
            }
            
            form {
                height: 80%;
                min-width: 300px;
                width: 35%;
                background-color: rgba(255, 255, 255, .15);  
                backdrop-filter: blur(15px);
                
                display: flex;
                flex-direction: column;
            }
            
            .content {      
                flex: 1;
                
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 30px 0;
            }
         
            
            .field:not(:last-child) {
                margin-bottom: 30px;
            }
            
            .messages {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
            }
            
            .actions {
                display: flex;
                padding: 30px 0;
                
                justify-content: flex-end;
            }
            
            .submit-action {
                padding-right: 20px;
                border-right: 5px solid lightgreen;
            }
            
            .submit-action:hover {
                font-style: italic;
            }
          `}</style>
        </>
    );
}
