import moment from 'moment';
import React, { useState } from 'react'
import { statusfailedAsset, statusGreyAsset, statuspassedAsset, statusunderreviewAsset } from '../../assets';
import Tooltip from '@mui/material/Tooltip';
const CompetenceMatrixData = (props) => {
    const getDays = (date) => {
        var now = moment(new Date()); //todays date
        var end = moment(date); // another date
        var duration = moment.duration(end.diff(now));
        var Days = Math.floor(duration.asDays());
        return Days + 1;
    };
    const mySample = () => {
        for (let i = 0; i < props.company.length; i++) {
            if (props.company[i].user_id === props.topicItem.id)
                return 1;
        }
        return 0;
    }
    return (
        <>
            {
                props.vall.user_id === props.topicItem.id ? <>

                    <div className="p-0 m-0">

                        {getDays(props.vall?.expiry_date) < 0 ?

                            <div className="m-0 p-0">
                                <Tooltip title={props.vall?.expiry_date} arrow>
                                    <img src={statusfailedAsset} alt="" width="20px" height="20px" className="cursor" />
                                </Tooltip>

                            </div>
                            :
                            getDays(props.vall?.expiry_date) <= 30 &&
                                getDays(props.vall?.expiry_date) >= 0 ?
                                <div className="m-0 p-0">
                                    <Tooltip title={props.vall?.expiry_date} arrow>
                                        <img src={statusunderreviewAsset} alt="" width="20px" height="20px" className="cursor" />
                                    </Tooltip>
                                </div>
                                :
                                <div className="m-0 p-0">
                                    <Tooltip title={props.vall?.expiry_date} arrow>
                                        <img src={statuspassedAsset} alt="" width="20px" height="20px" className="cursor" />
                                    </Tooltip>
                                </div>
                        }

                    </div>
                </>
                    : <>{(props.val.user_certificate.length == props.ind + 1 && mySample() == 0) ? <> <img src={statusGreyAsset} width="20px" height="20px" /> </> : null} </>
            }
        </>
    )
}

export default CompetenceMatrixData