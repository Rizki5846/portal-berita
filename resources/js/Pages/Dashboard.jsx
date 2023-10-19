import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Dashboard({ auth }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, setIsNotif] = useState(false);
    const [flash, setFlash] = useState({ message: '' }); // Added state for flash messages

    const handleSubmit = async () => {
        const data = { title, description, category };
        try {
            await Inertia.post('/news', data);
            setIsNotif(true);
            setTitle('');
            setDescription('');
            setCategory('');
        } catch (error) {
            // Handle error here, display an error message, or log the error.
        }
    }

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await Inertia.get('/news');
                // Process the response data as needed
            } catch (error) {
                // Handle error here, display an error message, or log the error.
            }
        }

        if (!props.myNews) {
            fetchNews();
        }
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {isNotif && (
                                <div className="alert alert-info shadow-lg">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>{flash.message}</span>
                                    </div>
                                </div>
                            )}
                            <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(e) => setTitle(e.target.value)} value={title} />
                            <input type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" onChange={(e) => setDescription(e.target.value)} value={description} />
                            <input type="text" placeholder="Category" className="m-2 input input-bordered w-full" onChange={(e) => setCategory(e.target.value)} value={category} />

                            <button className='btn btn-outline m-2' onClick={() => handleSubmit()}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='p-4'>
                    <div className="card w-full lg:w-96 bg-base-100 shadow-xl">
                        <img
                            src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                        />
                        <div className="card-body">
                            <h2 className="card-title">
                                {title} {/* Display the dynamic title */}
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>{description} {/* Display the dynamic description */}</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-inline">{category} {/* Display the dynamic category */}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
