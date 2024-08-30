export function uploadImgToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve({ data: reader.result})
    }
    reader.onerror = reject
  })
}