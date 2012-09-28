var project_sheme = {
    
    displayName : {
        value : "", 
        display: "Display Name",
        hint:"Name used as a reference."
    },
    clientName : {
        value : "", 
        display: "Client Name"
    },
    //    locationName : { value : "", display: "Location Desciption"},
    //    geoLocation : {
    //        display : "Location",
    //        location : []
    //    },
    //    agentName : { value : "", display: "Agent Name"},
    //    agentCompany : { value : "", display: "Agent Company"},
    //    clientContactName : { value : "", display: "Client Contact Name"},
    //    
    //    proposedQuanity : { value : 0, display: "Proposed Quantity"},
    //    
    //    afterHoursDimming : {
    //        display : "After Hours Dimming",
    //        value : undefined,
    //        options : ["TBD","Yes","No"],
    //        hint : "Is dimming during late night required?"
    //    },
    //    
    //    clientName : { value : "", display: "Client Name"},
    //    locationName : { value : "", display: "Location Desciption"},
    //    agentName : { value : "", display: "Agent Name"},
    //    agentCompany : { value : "", display: "Agent Company"},
    //    clientContactName : { value : "", display: "Client Contact Name"},
    //    
    //    proposedQuanity : { value : 0, display: "Proposed Quantity"},
    //    
    //    afterHoursDimming : {
    //        display : "After Hours Dimming",
    //        value : undefined,
    //        options : ["TBD","Yes","No"],
    //        hint : "Is dimming during late night required?"
    //    },
    //    
    //    phasingOfProject : {
    //        display : "Phasing of Project",
    //        value : "",
    //        hint : "Will there be any phasing of project?"
    //    },
    //    
    //    budget : {
    //        display : "Budget",
    //        value : "",
    //        hint : "Estimated budget of project"
    //    },
    //
    //    epaRequirement : {
    //        display : "EPA/winload salt air?",
    //        value : "",
    //        hint : "Is there an EPA/windload requirement/salt air"
    //    },
    //    
    //    roadwayJurisdiction : {
    //      display : "Roadway Jurisdiction",
    //      value : undefined,
    //      options : ["TBD", "Fedral", "State", "Local"]
    //    },
    //    
    //    voltage : {
    //        display : "Voltage at pole",
    //        value : undefined,
    //        options : ["TBD","120VAC","240VAC","277VAC"]
    //    },
    poles : [] 
};

function addProject(data,cb){
    var error=false;
    var missing = [];
    for(var key in project_sheme){
        if(project_sheme[key].value !== undefined && data[key] == undefined){
            missing.push(key);
            error = true;
        }
    }
    if(error){
        cb({
            code:400,
            msg : "Adding project failed, supplied data did not match scheme.",
            missing : missing
        },null);
    }else{
        cb(null,null)   
    }
}

module.exports = function (app,settings) {
    return {
        scheme : {
            project : project_sheme,
            pole : {}
        },
        addProject : addProject
    };
}