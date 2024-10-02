import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseApi from '../services/useApi';
import { USER_DETAIL, UPDATE_USER, DELETE_USER } from '../config/urls';
import eyeIcon from '/icons/eye.svg';
import eyeOffIcon from '/icons/eye-off.svg';

function Profile({ onLogout }) {
    const [user, setUser] = useState({
        first_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        current_password: '',
        phone: '',
        address: '',
        province: '',
        postalCode: '',
        description: '',
        photo: null,
        user_type: '',
    });
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { data: userData, loading: userLoading, error: userError } = UseApi({ apiEndpoint: USER_DETAIL });
    
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            setUser({
                first_name: userData.first_name || '',
                username: userData.username || '',
                email: userData.email || '',
                password: '',
                confirm_password: '',
                current_password: '',
                phone: userData.phone || '',
                address: userData.address || '',
                province: userData.province || '',
                postalCode: userData.zip_code || '',
                description: userData.user_description || '',
                photo: userData.photo || null,
                user_type: userData.user_type || '',
            });
            if (userData.photo) {
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
            formData.append('first_name', user.first_name);
            formData.append('username', user.username);
            formData.append('email', user.email);
            formData.append('current_password', user.current_password);
            formData.append('phone', user.phone);
            formData.append('address', user.address);
            formData.append('province', user.province);
            formData.append('zip_code', user.postalCode);
            formData.append('user_description', user.description);
    
            // Si se está cambiando la contraseña, la incluimos
            if (user.password) {
                formData.append('password', user.password);
                formData.append('confirm_password', user.confirm_password);
            }
    
            // Solo agregamos la foto si se ha seleccionado una
            if (user.photo instanceof File) {
                formData.append('photo', user.photo);
            }
    
            // Realizamos la solicitud PATCH
            await axios.patch(UPDATE_USER, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
    
            console.log('Perfil actualizado correctamente');
        } catch (error) {
            if (error.response) {
                console.error('Error al actualizar el perfil:', error.response.data);
            } else {
                console.error('Error al actualizar el perfil:', error.message);
            }
            setUpdateError('Error al actualizar el perfil');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProfile = async () => {
        if (!isConfirmed) return;

        try {
            await axios.delete(DELETE_USER, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });

            localStorage.removeItem('token');
            onLogout();
            navigate('/');
        } catch (error) {
            setDeleteError('Error al borrar el perfil');
        }
    };

    const handleCheckboxChange = (e) => {
        setIsConfirmed(e.target.checked);
    };

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 bg-gray-100">
            <div className="w-full max-w-md h-full max-h-[90vh] overflow-y-auto bg-white p-6 shadow-lg rounded-lg">
                <div className="flex justify-start mb-4">
                    <img
                        src="/icons/arrow.svg"
                        alt="Back to HomeLogin"
                        className="h-6 w-6 cursor-pointer"
                        onClick={handleBackToHome}
                    />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                    Perfil de {user.username}
                </h2>

                {previewPhoto && (
                    <div className="flex justify-center mb-4">
                        <img src={previewPhoto} alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover" />
                    </div>
                )}
                
                {userLoading ? (
                    <p className="text-gray-600">Cargando detalles del perfil...</p>
                ) : userError ? (
                    <p className="text-red-600">Error al cargar el perfil</p>
                ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        {/* Campo para el nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Nombre</label>
                            <input
                                type="text"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Nombre de usuario</label>
                            <input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        {/* Contraseña actual */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Contraseña actual</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    name="current_password"
                                    value={user.current_password}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                                <img
                                    src={showCurrentPassword ? eyeIcon : eyeOffIcon}
                                    alt="Mostrar/Ocultar contraseña actual"
                                    className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                                    onClick={toggleCurrentPasswordVisibility}
                                />
                            </div>
                        </div>

                        {/* Nueva contraseña */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Nueva contraseña</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                                <img
                                    src={showNewPassword ? eyeIcon : eyeOffIcon}
                                    alt="Mostrar/Ocultar nueva contraseña"
                                    className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                                    onClick={toggleNewPasswordVisibility}
                                />
                            </div>
                        </div>

                        {/* Confirmar nueva contraseña */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Confirmar nueva contraseña</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirm_password"
                                    value={user.confirm_password}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                                <img
                                    src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                                    alt="Mostrar/Ocultar confirmar nueva contraseña"
                                    className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                                    onClick={toggleConfirmPasswordVisibility}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Teléfono</label>
                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Provincia</label>
                            <input
                                type="text"
                                name="province"
                                value={user.province}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Código Postal</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={user.postalCode}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Descripción</label>
                            <textarea
                                name="description"
                                value={user.description}
                                onChange={handleChange}
                                maxLength={250}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm resize-y"  // Aquí añadí 'resize-y' para permitir redimensionar verticalmente.
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Foto de perfil</label>
                            <input
                                type="file"
                                name="photo"
                                onChange={handlePhotoChange}
                                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        {updateError && <p className="text-red-600">{updateError}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4 rounded-xl bg-customGreen text-white py-2 px-4 hover:bg-customGreenL"
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
                        className="w-full mt-4 rounded-xl bg-red-600 text-white py-2 px-4 hover:bg-red-700"
                    >
                        {isSubmitting ? 'Borrando...' : 'Borrar perfil'}
                    </button>

                    {deleteError && <p className="text-red-600">{deleteError}</p>}
                </div>
            </div>
        </div>
    );
}

export default Profile;
