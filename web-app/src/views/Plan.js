import React from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../components/Card';

const Plan = ({ userPlans }) => {

  let navigate = useNavigate();

  const planViewHandler = (planDetails) => {
    navigate(`/plans/${planDetails}`);
  }

  return (
    <>
      <h3 className="mt-2">{`Welcome ${userPlans.firstName} ${userPlans.lastName}`}</h3>
      <div className="container">
        <div className="row">
          <h5 className="fw-light fst-italic">Owned Plans</h5>
          {Object.keys(userPlans).length > 0 && userPlans.ownedPlans.map((singleElement, index) => {
            let memberCount = singleElement.members.length;
            let object = {
              "index": index,
              "title": singleElement.name,
              "subtitle": `No of Members: ${memberCount}`,
              "btnClickHandler": planViewHandler,
              "buttonName": 'View',
              "planId": singleElement.id,
            }
            return <Card key={index} singleElement={object} />
          })
          }
        </div>
        <div className="row">
          <h5 className="fw-light fst-italic">Member Plans</h5>
          {Object.keys(userPlans).length > 0 && userPlans.memberPlans.map((singleElement, index) => {
            let memberCount = singleElement.members.length;
            let object = {
              "index": index,
              "title": singleElement.name,
              "subtitle": `No of Members: ${memberCount}`,
              "btnClickHandler": planViewHandler,
              "buttonName": 'View',
              "planId": singleElement.id,
            }
            return <Card key={index} singleElement={object} />
          })
          }
        </div>
      </div>
    </>
  )
}

export default Plan