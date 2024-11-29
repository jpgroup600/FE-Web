import React from 'react';

const FormSelect = ({ label, value, onChange, options, required = false }) => {
    return (
        <div className="form-data">
            <div className="form-input-group">
                <label>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full mt-4 h-[50px] px-4 rounded-[5px]"
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FormSelect; 