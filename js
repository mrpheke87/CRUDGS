<script>
  // Prevent forms from submitting.
  function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
      event.preventDefault();
      });
    }
  }
  window.addEventListener("load", functionInit, true); 
  
  //INITIALIZE FUNCTIONS ONLOAD
  function functionInit(){  
    preventFormSubmit();
    getLastTenRows();
  };      
  
  //HANDLE FORM SUBMISSION
  function handleFormSubmit(formObject) {
    google.script.run.withSuccessHandler(createTable).processForm(formObject);
    document.getElementById("myForm").reset();
  }
  
  //GET LAST 10 ROWS
  function getLastTenRows (){
   google.script.run.withSuccessHandler(createTable).getLastTenRows();
  }
  
  
  //GET ALL DATA
  function getAllData(){
    //document.getElementById('dataTable').innerHTML = "";
    google.script.run.withSuccessHandler(createTable).getAllData();
  }
  
  
  //CREATE THE DATA TABLE
  function createTable(dataArray) {
    if(dataArray){
      var result = "<table class='table table-sm' style='font-size:0.8em'>"+
                   "<thead style='white-space: nowrap'>"+
                     "<tr>"+                               //Change table headings to match witht he Google Sheet
                      "<th scope='col'>Delete</th>"+
                      "<th scope='col'>Edit</th>"+
                      "<th scope='col'>ID</th>"+
                      "<th scope='col'>Nama Lengkap</th>"+
                      "<th scope='col'>NISN</th>"+
                      "<th scope='col'>Gender</th>"+
                      "<th scope='col'>Alamat/Domisili</th>"+
                      "<th scope='col'>Tempat Lahir</th>"+
                      "<th scope='col'>Tanggal Lahir</th>"+
                      "<th scope='col'>Email</th>"+
                      "<th scope='col'>Kontak</th>"+
                      "<th scope='col'>Kelas</th>"+
                      "<th scope='col'>Jurusan</th>"+
                    "</tr>"+
                  "</thead>";
      for(var i=0; i<dataArray.length; i++) {
          result += "<tr>";
          result += "<td><button type='button' class='btn btn-danger btn-xs deleteBtn' onclick='deleteData(this);'>Delete</button></td>";
          result += "<td><button type='button' class='btn btn-info btn-xs editBtn' onclick='editData(this);'>Edit</button></td>";
          for(var j=0; j<dataArray[i].length; j++){
              result += "<td>"+dataArray[i][j]+"</td>";
          }
          result += "</tr>";
      }
      result += "</table>";
      var div = document.getElementById('dataTable');
      div.innerHTML = result;
      document.getElementById("message").innerHTML = "";
    }else{
      var div = document.getElementById('dataTable');
      div.innerHTML = "Data not found!";
    }
  }

  //DELETE DATA
  function deleteData(el) {
    var result = confirm("Want to delete?");
    if (result) {
      var recordId = el.parentNode.parentNode.cells[2].innerHTML;
      google.script.run.withSuccessHandler(createTable).deleteData(recordId);
    }
  }
  
  
  //EDIT DATA
  function editData(el){
    var recordId = el.parentNode.parentNode.cells[2].innerHTML; //https://stackoverflow.com/a/32377357/2391195
    google.script.run.withSuccessHandler(populateForm).getRecordById(recordId);
  }

  //POPULATE FORM
  function populateForm(records){
    document.getElementById('RecId').value = records[0][0];
    document.getElementById('nama').value = records[0][1];
    document.getElementById('nisn').value = records[0][2];
    document.getElementById(records[0][3]).checked = true;
    document.getElementById('alamat').value = records[0][4];
    document.getElementById('tempatLahir').value = records[0][5];
    document.getElementById('tglLahir').value = records[0][6];
    document.getElementById('email').value = records[0][7];
    document.getElementById('phone').value = records[0][8];
    document.getElementById("kelas").value = records[0][9];
    document.getElementById("jurusan").value = records[0][10];
    document.getElementById("message").innerHTML = "<div class='alert alert-warning' role='alert'>Update Record [ID: "+records[0][0]+"]</div>";
  }
  
  //RETRIVE DATA FROM GOOGLE SHEET FOR COUNTRY DROPDOWN
  function createCountryDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(countryDropDown).getDropdownList("Helpers!A1:A195");
  }
  
  //POPULATE COUNTRY DROPDOWNS
  function countryDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('kelas');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }
</script>