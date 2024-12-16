function FormatNumber({number, element}){
    const formatter = new Intl.NumberFormat('en-US', {
      style:'decimal',
      minimumFractionDigits:0,
      maximumFractionDigits:0
    });
  
const formattedNumber = formatter.format(number, element);
return (
    <div>
      {element}{formattedNumber}
    </div>
  );
}

export default FormatNumber;