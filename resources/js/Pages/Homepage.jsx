import { Link, Head } from '@inertiajs/react';

export default function Homepage(props){
    console.log(props)
    return(
        <div className='flex justify-center items-center min-h-screen bg-neutral-800 text-white
        text-2xl'>
            <Head title={props.title}/>
            <h1>{props.description}</h1>
        </div>
    )

}