import Hat from "../components/hat";
import Styles from "../components/styles";
import React from "react";
import fetch from "isomorphic-unfetch";
import {env} from "../environment";

export default function SignIn() {
    const isValidForm = (form) => {
        for (const key of form.keys()) {
            const isValidField = document.querySelector(`input#${key}`).reportValidity();
            if (!isValidField) return false;
        }
        return true;
    };

    const signIn = async (e) => {
        const messageBox = document.querySelector('#messages');
        messageBox.textContent = '';
        const form = new FormData(document.querySelector('#form'));

        if (isValidForm(form)) {
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const button = e.target;

            button.classList.add('loading');

            const res = await fetch(`${env.usersApi}?email=${email}&password=${password}&action=sign-in`);
            const data = await res.json();

            button.classList.remove('loading');

            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.replace(`/iam?=${data.username}`)
            } else {
                messageBox.textContent = 'there is no user with such data';
            }
        }
    };

    return (
        <>
            <Hat title={'Sign In'}/>

            <main>
                <form action="" id={'form'} autoComplete="off">
                    <h1>sign in</h1>
                    <div className={'content'}>
                        <input id={'email'} type="email" name={'email'} className={'field'} placeholder={'email'} required={true}/>
                        <input id={'password'} type="password" className={'field'} name={'password'} placeholder={'password'} required={true}/>
                        <div id={'messages'} className={'messages'}/>
                    </div>
                    <div className={'actions'}>
                        <button type={'button'} className={'submit-action'} onClick={signIn}>submit</button>
                    </div>
                </form>
            </main>

            <Styles />

            <style jsx>{`
            h1 {
                margin: 30px 0;
                font-size: 25px;
                padding-left: 20px;
                border-left: 5px solid deeppink;
            }
            
            main {
                background-image: url("image/sign-in.jpg");
                
                
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
                margin-bottom: 20px;
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
