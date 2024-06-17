export function uploadFile(event) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const htmlContent = e.target.result;
        document.querySelector("rpg-character").innerHTML = htmlContent; 

      };
          
      reader.readAsText(file);
  
    } else {
      alert('Please upload a valid player xml file');
    }
}
