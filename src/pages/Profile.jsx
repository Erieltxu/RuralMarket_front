import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseApi from '../services/useApi'; 
import { USER_DETAIL, UPDATE_USER, DELETE_USER } from '../config/urls';

function Profile({ onLogout }) {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        current_password: '',
        user_type: '',
        phone: '',
        address: '',
        province: '',
        postalCode: '',
        description: '',
        photo: null,
    });
    const [previewPhoto, setPreviewPhoto] = useState(null); 
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const { data: userData, loading, error } = UseApi({
        apiEndpoint: USER_DETAIL,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    });

    useEffect(() => {
        if (userData) {
            setUser({
                first_name: userData.first_name || '',
                username: userData.username || '',
                email: userData.email || '',
                password: '',
                confirm_password: '',
                current_password: '',
                user_type: userData.user_type || '',  
                phone: userData.phone || '',
                address: userData.address || '',
                province: userData.province || '',
                postalCode: userData.zip_code || '',
                description: userData.user_description || '',
                photo: userData.photo || null,
            });
            if (userData.user_type === 'seller' && userData.photo) {
                setPreviewPhoto(userData.photo); 
            }
        }
    }, [userData]);

    const handleBackToHome = () => {
        navigate('/HomeLogin');
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setUser({ ...user, photo: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewPhoto(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('email', user.email);
            formData.append('current_password', user.current_password);
            if (user.password) {
                formData.append('password', user.password);
                formData.append('confirm_password', user.confirm_password);
            }
            if (user.user_type === 'seller') { 
                formData.append('first_name', user.first_name);
                formData.append('phone', user.phone);
                formData.append('address', user.address);
                formData.append('province', user.province);
                formData.append('postalCode', user.postalCode);
                formData.append('description', user.description);
                if (user.photo) {
                    formData.append('photo', user.photo);
                }
            }

            const response = await fetch(UPDATE_USER, {
                method: 'PUT',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }

        } catch (error) {
            setUpdateError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProfile = async () => {
        if (!isConfirmed) return;
        try {
            const response = await fetch(DELETE_USER, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Error al borrar el perfil');
            }

            localStorage.removeItem('token');
            onLogout();
            navigate('/');
            
        } catch (error) {
            setDeleteError(error.message);
        }
    };

    const handleCheckboxChange = (e) => {
        setIsConfirmed(e.target.checked);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
            <div className="w-full max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg max-h-screen overflow-y-auto">
                <div className="flex justify-start mb-4">
                    <img
                        src="/icons/arrow.svg"
                        alt="Back to HomeLogin"
                        className="h-6 w-6 cursor-pointer"
                        onClick={handleBackToHome}
                    />
                </div>

                <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center mb-4">Perfil de {user.username}</h2>

                {user.user_type === 'seller' && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={previewPhoto || '/icons/default-user.svg'}  
                            alt="Foto de perfil"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    </div>
                )}

                {loading ? (
                    <p>Cargando detalles del perfil...</p>
                ) : error ? (
                    <p className="text-red-600">Error al cargar el perfil: {error.message}</p>
                ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Nombre de usuario</label>
                            <input
                                type="text"
                                name="username"
                                value={user.username}
                                readOnly
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Contraseña actual</label>
                            <input
                                type="password"
                                name="current_password"
                                value={user.current_password}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Nueva contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Confirmar nueva contraseña</label>
                            <input
                                type="password"
                                name="confirm_password"
                                value={user.confirm_password}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        {user.user_type === 'seller' && (
                            <>
                                 <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={user.first_name}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Teléfono</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={user.address}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Provincia</label>
                                    <input
                                        type="text"
                                        name="province"
                                        value={user.province}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Código Postal</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={user.postalCode}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Descripción</label>
                                    <textarea
                                        name="description"
                                        value={user.description}
                                        onChange={handleChange}
                                        maxLength={250}
                                        className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Foto de perfil</label>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handlePhotoChange}
                                        className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </>
                        )}

                        {updateError && <p className="text-sm text-red-600">{updateError}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full justify-center rounded-xl bg-customGreen px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customGreenL focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {isSubmitting ? 'Actualizando...' : 'Actualizar perfil'}
                        </button>
                    </form>
                )}

                <div className="mt-6">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isConfirmed}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Confirmar borrar perfil
                        </label>
                    </div>

                    <button
                        onClick={handleDeleteProfile}
                        disabled={!isConfirmed || isSubmitting}
                        className="flex w-full justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        {isSubmitting ? 'Borrando...' : 'Borrar perfil'}
                    </button>

                    {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}
                </div>
            </div>
        </div>
    );
}

export default Profile;
