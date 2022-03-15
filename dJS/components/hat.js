import React from "react";
import Head from "next/head";

export default function Hat (props) {
    return (
        <Head>
            <title>{props.title}</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                  crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />

            {props?.children}
        </Head>
    );
}
