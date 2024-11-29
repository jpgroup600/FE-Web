import React from 'react';

const FormTextArea = ({ label, value, onChange, rows = 10, required = false }) => {
    return (
        <div className="form-data">
            <div className="form-input-group">
                <label>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    className="w-full mt-4 px-4 py-2 rounded-[5px]"
                />
            </div>
        </div>
    );
};

export default FormTextArea; 