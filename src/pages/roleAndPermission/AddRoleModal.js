import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import ModalComponent from '../../components/Model/Model';
import Button from '../../components/Button/Button';
import { rpAsset } from '../../assets';
import { Modal } from 'react-bootstrap';
import "./RoleAndPermission.css";
import "../../components/ResponsiveText.css";
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchableDropdown from '../../components/searchDropdown/SearchableDropdown';
import {
    useGetCompaniesListQuery,
} from "../../services/api";
import ErrorViewer from '../../components/errorViewer/ErrorViewer';
import formDataConverter from '../../utils/formDataConverter';
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";

const AddRoleModal = (props) => {
    const [company_id, setCompanyId] = useState("")
    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);

    const userInfo = useSelector((state) => state.auth?.userDetail?.user);

    const {
        data: companyList,
        isLoading: companyListLoading,
        isFetching: companyListFetching,
        isError: companyListError,
    } = useGetCompaniesListQuery({ url: '', params: { 'search': '', company_id: company_id } });

    const company_Id = useSelector(
        (state) => state.auth.userDetail.user.company_id
      );
    
      useEffect(() => {
        setCompanyId(company_Id);
      }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required((keywordTranslation && keywordTranslation["roleRequired"]) || validationsKey.roleRequired),
        company_id: Yup.string().required((keywordTranslation && keywordTranslation["companyRequired"]) || validationsKey.companyRequired),
    });
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onTouched",
    });

    const onSubmit = (values) => {

        if (props.data) {
            values["_method"] = "put";
        }

        props.action(formDataConverter(values), "roleid"); // getting values fron common method
    };

    useEffect(() => {
        if (props.data) {
            let { name, company_id, status } = props.data;
            reset({ name, company_id, status });
        }
    }, []);

    return (
        <>
            <ModalComponent
                size="md"
                show={true}
                handleClose={props.handleCloseAddroleModal}
                title={(keywordTranslation && keywordTranslation[props.data ? "editRole" : "addRole"]) || (props.data ? langKey.editRole : langKey.addRole)}
                // icon={rpAsset}
            >

                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <label className="modalLabel d-flex mb-1 ml-0">{(keywordTranslation && keywordTranslation["roleName"]) || langKey.roleName}</label>
                            <input
                                type="text"
                                className="typetext fontsize-12 pl-2"
                                placeholder={keywordTranslation && keywordTranslation["Type here.."] || "Type here.."}
                                {...register("name")}
                            />
                            {errors.name && <ErrorViewer className="mt-2" message={errors.name.message} />}
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-6 pr-2">
                            <label className="modalLabel d-flex mb-1 ml-0">{(keywordTranslation && keywordTranslation["company"]) || langKey.company}</label>

                            <SearchableDropdown
                                placeholder={
                                    // userInfo?.company
                                    //     ? userInfo?.company?.name
                                    //     :
                                         (keywordTranslation && keywordTranslation["selectCompany"]) || langKey.selectCompany}
                                options={companyList}
                                selectedValue={props?.data?.company_id}
                                {...register("company_id")}
                                changeHandler={(value) => {
                                    setValue("company_id", value);
                                }}
                            />

                            {errors.company_id && <ErrorViewer className="mt-2" message={errors.company_id.message} />}
                        </div>

                        <div className="col-6 pl-2">
                            <label className="modalLabel d-flex mb-1 ml-0">{(keywordTranslation && keywordTranslation["status"]) || langKey.status}</label>
                            <select
                                className="selectStatusRole fw-500 form-select"
                                {...register("status")}
                                onChange={(e) => e.target.value}
                            >
                                <option value='active'>{(keywordTranslation && keywordTranslation["active"]) || langKey.active}</option>
                                <option value='inactive'>{(keywordTranslation && keywordTranslation["inActive"]) || langKey.inActive}</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div className='m-0 p-0'>
                        <Button label={(keywordTranslation && keywordTranslation["cancel"]) || langKey.cancel} buttonStyle="cancel mr-2" onClick={props.handleCloseAddroleModal} />
                        <Button
                            label={(keywordTranslation && keywordTranslation[(props.data ? "updatebtn" : "Create")]) || (props.data ? langKey.updatebtn : langKey.create)}
                            buttonStyle={props.data ? "updateBtn" : "createbtn"}
                            onClick={handleSubmit(onSubmit)}
                            loading={props.loading}
                        />
                    </div>
                </Modal.Footer>


            </ModalComponent>
        </>
    )
}

export default AddRoleModal;