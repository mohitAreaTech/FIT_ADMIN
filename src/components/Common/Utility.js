export function downloadBase64File(contentBase64, fileName) {
  const linkSource = `data:application/pdf;base64,${contentBase64}`;
  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  downloadLink.href = linkSource;
  downloadLink.target = "_self";
  downloadLink.download = fileName;
  downloadLink.click();
  covertToFile(linkSource, fileName);
}

const covertToFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  console.log("mime", mime);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const file = new File([u8arr], filename + ".pdf", { type: mime });
  // uploadFileAttechment(file, store.getState().root.apiRequestQQ.policyIdDb);
};

export const coverType = [
  {
    "name": "Rollover",
    "value": "rollover"
  },
  {
    "name": "New",
    "value": "new"
  },
  {
    "name": "Used",
    "value": "used"
  },
  {
    "name": "Rollover Breakin",
    "value": "rollover breakin"
  },
]

export const productType = [
  {
    "name": "Pvt Car",
    "value": "Pvt Car"
  },
  {
    "name": "MotorBike",
    "value": "MotorBike"
  },
  {
    "name": "Scooter",
    "value": "Scooter"
  },
  {
    "name": "Passenger Carrying",
    "value": "Passenger Carrying"
  },
  {
    "name": "Goods Carrying",
    "value": "Goods Carrying"
  },
  {
    "name": "Miscellaneous",
    "value": "Miscellaneous"
  },
]