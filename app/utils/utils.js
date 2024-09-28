// export const formatDate = (dateString) => {
//     const date = new Date(dateString);
    
//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
//     const dayOfWeek = daysOfWeek[date.getDay()];
//     const dayOfMonth = date.getDate();
//     const month = months[date.getMonth()];
//     const year = date.getFullYear();
  
//     return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
// }

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Array of abbreviated month names
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayOfMonth = date.getDate(); // Get the day of the month
  const month = shortMonths[date.getMonth()]; // Get the abbreviated month

  return `${month} ${dayOfMonth}`; // Return in "16 Sep" format
};

export const renderParagraphs = (content) => {
    if (typeof content !== 'string' || content.trim() === '') {
      return <p>No content available.</p>;
    }
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      console.log(fileReader.result);
      fileReader.onload = () => {
          resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
          reject(error);
      }
  });
}

export const CREATOR_SECRET = process.env.CREATOR_SECRET;