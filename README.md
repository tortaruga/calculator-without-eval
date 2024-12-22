# overview 👋

simple calculator made with vanilla JS without using the eval() function. it's very basic (can do only addition, subtraction, division and multiplication, doesn't support parentheses or other fancy symbols, but it does support decimal numebers!) and you can choose between three different themes.

[live site]()

I have done this challenge three times. THREE TIMES!
the first version was made using eval() so i didn't like it, the second version was made using math.js, and this is made with the Shunting Yard Algorithm. 

# notes on theme switcher

the theme switcher is made using radio buttons (invisible until you click on them) 
(how do i click on them if they're invisible) 
(well, you either guess where they are) 
(roughly one third each of the toggle container, directly below their number) 
(or you just click the number, which is a label, so it works the same)

if you have your preferences set to dark the default theme will be the dark one, and then if you change it and close the page when you open it again it will have the last theme you had selected;

if your preferences are not set or are set to light the default theme be the first one, and then on successive loads it will have the last theme you selected.

# notes on calculator 😵‍💫

the calculator uses the shunting yard algorithm to convert the expression from infix notation (a + b) to postfix notation (a b +) and then evaluates that. 

(i'm acting as though i know what i'm talking about, but the first time i heard of this was when i was researching a way to code this damned calculator without using eval()).

if anyone's interested in how it works, (though it's mainly for me because i WILL forget all i understood this afternoon), this is the basics of it: 

## infix to postfix conversion

- you 'tokenize' the infix notation expression by separating it into chunks: numbers or operators

- the numbers will go into an array (output), while for the operators you check whether the last operator in the operators array (if it exists) has higher or equal precedence (basically that stuff that multiplications and divisions come before addition and subtraction)

- if this is the case, you remove said operator and push it to the output array, and keep checking your token against the next last operator in the array, until you either run out of them, or encounter one with lower precedence

- at this point you can push your token in the operators array and go to the next token

- when you're done with all the tokens you end up with two arrays, output and operators, and you push the remaining elements in the operators array into the output, starting from the last, and you obtain an output array which contains the tokens of your mathematical expression rearranged into postfix notation. sweet.

## evaluating the postfix expression

- you thought it was over. ha.

- now you take your array with your tokens, and check them one by one again: this time if the token is a number (or rather a string containing a number) you convert it to type number and push it to an array that we'll call stack

- if the token is an operator, you remove the last two numbers from the stack, and perform the operation with the last number as second operand, and the second to last number as first operand
(i explain badly, but it basically means that if the last two elements of stack are a and b and the token is +, you do a + b)

- now you push the result of this operation into stack and keep moving with the next token

- when you've done this for all the tokens, you end up with a stack array containing one single element: the holy grail. this is the result of your mathematical expression. finally. 

- now you just add event listeners to the buttons:

- for the DEL button you remove the last character from the expression (the content of the display input)

- for the reset button you empty the expression

- for the numbers and operators you update the expression with the corresponding character (these will end up forming the beast we'll pass as expression to our conversion and evaluation functions)

- for the = button you call the functions to convert and evaluate the expression, and then update the display to show the result.

- we're done. we're free. we can kill ourselves now.