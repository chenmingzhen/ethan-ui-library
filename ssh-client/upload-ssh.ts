const { exec } = require('child_process')

exec(`upload.sh`, error => {
  if (error) {
    console.log(error)
  }
})
