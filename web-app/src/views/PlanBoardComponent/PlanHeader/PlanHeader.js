import React, { useContext } from "react";
import SearchBar from "../Search/SearchBar.js"
import './PlanHeader.scss';
import { UserContext } from "../../../context/UserContext";

const PlanHeader = (props) => {

    const [userContext] = useContext(UserContext);

    // if user is an owner make member list editable
    const disableEdit = userContext.userId === props.plan.createdBy ? false : true;

    // call api to add or delete member from a plan
    const callApiToUpdateMember = (planId, memberId, method) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + `/plans/${planId}/member/${memberId}`, {
            method: method,
            headers: {
                "Authorization": `Bearer ${userContext.token}`,
                "Content-Type": "application/json"
            },
        })
            .then(async (res) => {
                console.log(await res.json())
            })
    }

    // on change of member list call this method
    const handleSelection = (members, actionObj) => {
        let actionPerformed = actionObj.action;
        let memberId = "";
        let planId = props.plan._id;
        let method = "PUT";

        // if action performed is remove set fetch api method to delete
        if (actionPerformed === "remove-value") {
            method = "DELETE";
            memberId = actionObj.removedValue._id;
        } else {
            memberId = actionObj.option._id;
        }
        console.log(`Action :${actionPerformed}, Member Id: ${memberId}, Plan Id: ${planId}`);
        callApiToUpdateMember(planId, memberId, method);
    }

    return (
        <div className="row">
            <h5 className="fs-4 fst-italic col-6">{props.plan.name}</h5>
            <div className="planMemberDiv col-6">
                <SearchBar
                    searchList={props.users}
                    shouldIgnoreUser={true}
                    isMulti={true}
                    ignoreUser={props.plan.createdBy}
                    defaultVal={props.plan.members}
                    onChangeHandler={handleSelection}
                    disableSelect={disableEdit}
                    placeHolderText={"Add Members"}
                />
            </div>
        </div>
    )
}

export default PlanHeader;