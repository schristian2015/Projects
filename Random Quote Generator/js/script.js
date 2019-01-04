/******************************************
Treehouse Techdegree:
FSJS project 1 - A Random Quote Generator
******************************************/

var quotesArray = [{
		quote: "Only I can change my life. No one can do it for me",
		source: 'Carol burnett'
    },
	{
		quote: "Good, better, best. Never let it rest. Till your good is better and your better is best.",
		source: 'St. Jerome'
    },
	{
		quote: "The most difficult thing is the decision to act, the rest is merely tenacity.",
		source: 'Amelia Earhart'
    },
	{
		quote: "Every strike brings me closer to the next home run",
		source: "Babe Ruth"
    },
	{
		quote: "Definiteness of purpose is the starting point of all achievement.",
		source: 'Clement Stone'
    },
	{
		quote: "Life isn't about getting and having, it's about giving and being.",
		source: 'Kevin Kruse'
    },
	{
		quote: "Life is what happens to you while you’re busy making other plans.",
		source: 'John Lennon'
    }
];


/***
  Create the `getRandomQuote` function to:
   - generate a random number 
   - returns random number when called
***/
function getRandomQuote() {
	var arrayLength = quotesArray.length;
	var randomNum = Math.floor(Math.random() * arrayLength);
	return randomNum;
}



/***
	printQuote Function
	 - assign random number to randomNum from getRandomQuote() 
	 - target id: elementID and replace with quoteArray string
***/

function printQuote() {
	var randomNum = getRandomQuote();
	document.getElementById("quote").innerHTML = '" ' + quotesArray[randomNum]['quote'] + ' "';
	document.getElementById("source").innerHTML = '" ' + quotesArray[randomNum]['source'] + ' "';

}
/***
  called function directly via html onclick="printQuote()"
***/
