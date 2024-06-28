import { FormikProps } from "formik";
import React from "react";
import { EmailTemplate } from "./Templates/EmailTemplate";
import { SlackTemplate } from "./Templates/SlackTemplate";

export interface ChannelTypeTemplateProps<T> {
    formik: FormikProps<T>;
    id: string;
    statePrefix: string;
    type: string;
}

export const mockTags = [
    "AlertName",
    "Severity",
    "Description",
    "Service",
    "Affected Resources",
    "Alert evaluation"
];

export const ChannelTypeTemplate: React.FC<ChannelTypeTemplateProps<any>> = ({ formik, id, statePrefix, type }) => {

    const getArrayFieldName = (index: number, field: string) => statePrefix ? `${statePrefix}[${index}].${field}` : `${field}[${index}]`;
    const getArrayFieldError = (index: number, field: string) => {
        const fieldPath = statePrefix ? `${statePrefix}[${index}].${field}` : `${field}[${index}]`;
        return formik.touched[fieldPath] && formik.errors[fieldPath];
    };
    const getFieldName = (field: string) => statePrefix ? `${statePrefix}.${field}` : field ;
    const getFieldError = (field: string) => {
        const fieldPath = statePrefix ? `${statePrefix}.${field}` : field ;
        return formik.touched[fieldPath] ? formik.errors[fieldPath]?.toString  || "" : "";
    }
    const handleMultiInputChange = (field: string, newValue: string[], operation: string) => {
        //console.log(getFieldName(field), newValue)
        formik.setFieldValue(getFieldName(field), newValue);
    };
    
    return(
        <>
        {type === 'Email' && <EmailTemplate
                                formik={formik}
                                id={id}
                                statePrefix={statePrefix}
                                type={type}
                                getFieldName={getFieldName}
                                getFieldError={getFieldError}
                                handleEmailChange={handleMultiInputChange}
                            />
        }
        {type === 'Slack' && <SlackTemplate
                                formik={formik}
                                id={id}
                                statePrefix={statePrefix}
                                type={type}
                                getFieldName={getFieldName}
                                getFieldError={getFieldError}
                                handleSlackChannelChange={handleMultiInputChange}
                            />
        }
        </>
    );
};