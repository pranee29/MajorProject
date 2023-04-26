// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

contract FinalContract{

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
        string dr_Phn;
        string d_Name; // Name of doctor
        string d_qual;
        string hosp;
    }

    Doctor[] public DocList;
    Patient[] public PatientList;



    struct Patient{
        bool state; // To check whether patient is genuine
        address pa_Id; // Address of registered patient
        string pa_Name; // Name of Patient Name
        string pa_phn;
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

    
    function setDoctorDetails(bool _state,address _drId,string memory  _num,string memory _name,string memory _qual,string memory _hosp) public OnlyOwner {
        DocList.push(Doctor(_state,_drId,_num,_name,_qual,_hosp));
        DoctorInfo[_drId] = Doctor(_state,_drId,_num,_name,_qual,_hosp);
        emit DrDetailsAdded(msg.sender, _drId);
    }
    
    
    
    
    address[] drAddr;
    string[] drPhn;
    string[] hospName;
    function getDocbyName__mod(string memory _name) public  returns(address[] memory _dr_id, string[] memory _dr_phn,string[] memory  _hospN)  {
        drAddr=new address[](0);
        drPhn=new string[](0);
        hospName=new string[](0);
        for(uint256 i=0;i<DocList.length;i++){
            if(keccak256(abi.encodePacked((_name))) == keccak256(abi.encodePacked((DocList[i].d_Name)))){
                drAddr.push(DocList[i].dr_Id);
                drPhn.push(DocList[i].dr_Phn);
                hospName.push(DocList[i].hosp);
            }
        }
        return (drAddr,drPhn,hospName);
    }
    
    function getDocbyName() public view returns(address[] memory _dr_id, string[] memory _dr_phn,string[] memory _hosp){
        return (drAddr,drPhn,hospName);
    }


    function getDoctorDetails(address _Id) public OnlyOwner view returns(bool _state,address _drId,string memory _name, string memory  _num , string memory  _qual,string memory _hosp ){
        _state = DoctorInfo[_Id].state;
        _drId = DoctorInfo[_Id].dr_Id;
        _name = DoctorInfo[_Id].d_Name;
        _num=DoctorInfo[_Id].dr_Phn;
        _qual=DoctorInfo[_Id].d_qual;
        _hosp=DoctorInfo[_Id].hosp;
    }

    
    function getDoctorDetailsForDoc(address _Id) public Only_Doctors view returns(bool _state,address _drId,string memory _name, string memory  _num , string memory  _qual,string memory _hosp  ){
        _state = DoctorInfo[_Id].state;
        _drId = DoctorInfo[_Id].dr_Id;
        _name = DoctorInfo[_Id].d_Name;
        _num=DoctorInfo[_Id].dr_Phn;
        _qual=DoctorInfo[_Id].d_qual;
        _hosp=DoctorInfo[_Id].hosp;
    }
    
    
    function setHealthRecordsDetails(string memory _paName, address _paId,string memory  _phnNum, string memory _prescription, string memory _url) public Only_Doctors{
        patientToDoctor[_paId][msg.sender] = 1;
        PatientInfo[msg.sender].state = true;
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
    
    
    
    function setPatientDetails(bool _state,address _paId,string memory _paName,string memory  _phnNum,string[] memory _paRecords, string[] memory _paFiles) public Only_Doctors{
        PatientInfo[_paId] = Patient(_state,_paId,_paName,_phnNum,_paRecords,_paFiles);
        PatientList.push(Patient(_state,_paId,_paName,_phnNum,_paRecords,_paFiles));
        emit DrDetailsAdded(msg.sender, _paId);
    }
    


    
    
    function getPatientDetails(address _Id) public view returns(bool _state,address _paId,string memory  _paphn,string memory _paName,string[] memory _paRecords,string[] memory _paFiles){
       require(PatientInfo[msg.sender].state == true || patientToDoctor[_Id][msg.sender] == 1,"PATIENTS OR ACCESS_GRANTED_DOCTORS ONLY");
        _state = PatientInfo[_Id].state;
        _paId = PatientInfo[_Id].pa_Id;
        _paphn=PatientInfo[_Id].pa_phn;
        _paName = PatientInfo[_Id].pa_Name;
        _paRecords = PatientInfo[_Id].pa_Records;
        _paFiles=PatientInfo[_paId].pa_Files;
        return(_state,_paId,_paphn,_paName,_paRecords,_paFiles);
        
    }
    
    address[] paAddr;
    string[] paNum;
    function getPatientbyName_mod(string memory _name) public  returns(address[] memory _dr_id , string[] memory _dr_phn){
        paAddr=new address[](0);
        paNum=new string[](0);
        for(uint256 i=0;i<PatientList.length;i++){
            if(keccak256(abi.encodePacked((_name))) == keccak256(abi.encodePacked((PatientList[i].pa_Name)))){
                paAddr.push(PatientList[i].pa_Id);
                paNum.push(PatientList[i].pa_phn);
            }
        }
        return (paAddr,paNum);
    }
    
    function getPatientbyName() public view returns(address[] memory _pa_id, string[] memory _pa_phn){
        return (paAddr,paNum);
    }
    


    function grantAccessToDoctor(address doctor_id,uint access) public Only_Patients{
    	patientToDoctor[msg.sender][doctor_id] = access;
        emit GrantAccessToDr(doctor_id,msg.sender);
      }
  	
  	

}


