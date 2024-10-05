export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayOfMonth = date.getDate(); 
  const month = shortMonths[date.getMonth()];

  return `${month} ${dayOfMonth}`; 
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