// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

contract MedicalRecord1{

    mapping(address=>Doctor) DoctorInfo;
    mapping(address=>Patient) PatientInfo;
    mapping(address=> mapping(address => HealthRecords)) HealthInfo;
    mapping (address => mapping (address => uint)) private patientToDoctor;


    event DrDetailsAdded(address admin, address doctor);
    event HealthRecordsAdded(address dr, address patient);
    event GrantAccessToDr(address dr, address patient);
    event PatientDetailsAdded(address admin, address patient);




    modifier OnlyOwner(){
        require(msg.sender == owner,"ONLY ADMIN IS ALLOWED");
        _;
    }
    
    modifier Only_Doctors{
        require(DoctorInfo[msg.sender].state == true,"REGISTERED DOCTORS ONLY");
        _;
    }
    
    modifier Only_Patients{
        require(PatientInfo[msg.sender].state == true,"REGISTERED PATIENTS ONLY");
        _;
    }
    
    address owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    struct Doctor{
        bool state; // To check whether the doctor is registered or not
        address dr_Id; // Address of doctor
        uint256 dr_Phn;
        string d_Name; // Name of doctor
        
    }

    Doctor[] public DocList;
    Patient[] public PatientList;



    struct Patient{
        bool state; // To check whether patient is genuine
        address pa_Id; // Address of registered patient
        string pa_Name; // Name of Patient Name
        uint256 pa_phn;
        string[] pa_Records; // Used to store the prescription records of corresponding patients
        string[] pa_Files;
    }
    
    
    struct PrescriptionDetails{
        string prescription; // prescription details of patient given by doctor
    }
    
    
    struct HealthRecords{
        Doctor d;
        Patient p;
        PrescriptionDetails pre;
        string[] records; // Used to store prescription records of patient w.r.t doctor
        string[] files;
    }
    

    
    // Function to add Doctor details, done by admin only
    function setDoctorDetails(bool _state,address _drId,uint256 _num,string memory _name) public OnlyOwner {
        DocList.push(Doctor(_state,_drId,_num,_name));
        DoctorInfo[_drId] = Doctor(_state,_drId,_num,_name);
        emit DrDetailsAdded(msg.sender, _drId);
    }
    
    
    //Function to get Doctor Deatils By Name
    address[] drAddr;
    uint256[] drPhn;
    function getDocbyName(string memory _name) public  returns(address[] memory _dr_id, uint256[] memory _dr_phn){
        drAddr=new address[](0);
        drPhn=new uint256[](0);
        for(uint256 i=0;i<DocList.length;i++){
            if(keccak256(abi.encodePacked((_name))) == keccak256(abi.encodePacked((DocList[i].d_Name)))){
                drAddr.push(DocList[i].dr_Id);
                drPhn.push(DocList[i].dr_Phn);
            }
        }
        return (drAddr,drPhn);
    }
    

    // Function to get Doctor details for admin
    // Deleted OnlyOwner accessability
    function getDoctorDetails(address _Id)public OnlyOwner view returns(bool _state,address _drId,string memory _name,uint _dr_Phn){
        _state = DoctorInfo[_Id].state;
        _drId = DoctorInfo[_Id].dr_Id;
        _name = DoctorInfo[_Id].d_Name;
        _dr_Phn =DoctorInfo[_Id].dr_Phn;
    }
    
    
    
    // Function to add HealthRecords of patients, done by registered doctors only
    function setHealthRecordsDetails(string memory _paName, address _paId,uint256 _phnNum, string memory _prescription, string memory _url) public Only_Doctors{
        
        HealthInfo[msg.sender][_paId].d.d_Name = DoctorInfo[msg.sender].d_Name; 
        HealthInfo[msg.sender][_paId].d.dr_Id = DoctorInfo[msg.sender].dr_Id;
        HealthInfo[msg.sender][_paId].p.state = true;
        HealthInfo[msg.sender][_paId].p.pa_Id = _paId;
        HealthInfo[msg.sender][_paId].p.pa_Name = _paName;
        HealthInfo[msg.sender][_paId].p.pa_phn = _phnNum;
        HealthInfo[msg.sender][_paId].pre.prescription = _prescription;
        HealthInfo[msg.sender][_paId].records.push(_prescription);
        HealthInfo[msg.sender][_paId].files.push(_url);
        PatientInfo[_paId].pa_Records.push(_prescription);
        PatientInfo[_paId].pa_Files.push(_url);
        setPatientDetails(HealthInfo[msg.sender][_paId].p.state,HealthInfo[msg.sender][_paId].p.pa_Id,HealthInfo[msg.sender][_paId].p.pa_Name,HealthInfo[msg.sender][_paId].p.pa_phn,PatientInfo[_paId].pa_Records,PatientInfo[_paId].pa_Files);
        emit HealthRecordsAdded(msg.sender, _paId);
    }
    
    
    
    // Function to add Patient details, done by registered doctors only
    function setPatientDetails(bool _state,address _paId,string memory _paName,uint256 _phnNum,string[] memory _paRecords, string[] memory _paFiles) public Only_Doctors{
        PatientInfo[_paId] = Patient(_state,_paId,_paName,_phnNum,_paRecords,_paFiles);
        PatientList.push(Patient(_state,_paId,_paName,_phnNum,_paRecords,_paFiles));
        emit DrDetailsAdded(msg.sender, _paId);
    }
    


    
    
    // Function to get Patient details
    function getPatientDetails(address _Id) public view returns(bool _state,address _paId,string memory _paName,string[] memory _paRecords,string[] memory _paFiles){
       require(PatientInfo[msg.sender].state == true || patientToDoctor[_Id][msg.sender] == 1,"PATIENTS OR ACCESS_GRANTED_DOCTORS ONLY");
        _state = PatientInfo[_Id].state;
        _paId = PatientInfo[_Id].pa_Id;
        _paName = PatientInfo[_Id].pa_Name;
        _paRecords = PatientInfo[_Id].pa_Records;
        _paFiles=PatientInfo[_paId].pa_Files;
        return(_state,_paId,_paName,_paRecords,_paFiles);
        
    }
    
    //Function to get Patient Details by Name
    address[] paAddr;
    uint256[] paNum;
    function getPatientbyName(string memory _name) public  returns(address[] memory _pa_id , uint256[] memory _pa_phn){
        paAddr=new address[](0);
        paNum=new uint256[](0);
        for(uint256 i=0;i<PatientList.length;i++){
            if(keccak256(abi.encodePacked((_name))) == keccak256(abi.encodePacked((PatientList[i].pa_Name)))){
                paAddr.push(PatientList[i].pa_Id);
                paNum.push(PatientList[i].pa_phn);
            }
        }
        return (paAddr,paNum);
    }
    
    // Function to get HealthRecords only for registered patients
    function getHealthRecords(address _dr) Only_Patients public view returns(string memory _drName, address _drId, string memory _paName, address _paId,string memory _prescription,string[] memory _rec,string[] memory _file) {
        _drName = HealthInfo[_dr][msg.sender].d.d_Name;
        _drId = HealthInfo[_dr][msg.sender].d.dr_Id;
        _paName = HealthInfo[_dr][msg.sender].p.pa_Name;
        _paId = HealthInfo[_dr][msg.sender].p.pa_Id;
        _prescription = HealthInfo[_dr][msg.sender].pre.prescription;
        _rec = HealthInfo[_dr][msg.sender].records;
        _file = HealthInfo[_dr][msg.sender].files;
    }



    // Function to grant access to doctor ,so that the doctors with access can view the corresponding patients HealthRecords
    function grantAccessToDoctor(address doctor_id,uint access) public Only_Patients{
    	patientToDoctor[msg.sender][doctor_id] = access;
        emit GrantAccessToDr(doctor_id,msg.sender);
      }
  	
  	
  	
  	// Function to get HealthRecords only for registered Doctors
  	function getHealthRecordsForDoctor(address _paId) public Only_Doctors view returns(string memory _drName, address _drId, string memory _paName, address _pId,string memory _prescription,string[] memory _rec, string[] memory _files){
		require(patientToDoctor[_paId][msg.sender] == 1,"DR ACCESS NOT GRANTED");
		_drName = HealthInfo[msg.sender][_paId].d.d_Name;
        _drId = HealthInfo[msg.sender][_paId].d.dr_Id;
        _paName = HealthInfo[msg.sender][_paId].p.pa_Name;
        _pId = HealthInfo[msg.sender][_paId].p.pa_Id; 
        _prescription = HealthInfo[msg.sender][_paId].pre.prescription;
        _rec = HealthInfo[msg.sender][_paId].records;
        _files= HealthInfo[msg.sender][_paId].files;
	}

}