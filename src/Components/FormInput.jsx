import React from 'react';

const FormInput = ({ label, value, onChange, placeholder, required = false, type = "text" }) => {
    return (
        <div className="form-data">
            <div className="form-input-group">
                <label>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    className="w-full mt-4 h-[50px] px-4 rounded-[5px]"
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default FormInput; 