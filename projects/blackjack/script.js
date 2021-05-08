
    let blackjackGame = {
        'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0 },
        'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
        'cards' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
        'cardsMap': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'J': 10,'Q': 10,'K': 10,'A': [1,11]},
        'wins': 0,
        'losses': 0,
        'draws': 0
    }

    const YOU = blackjackGame['you'];
    const DEALER = blackjackGame['dealer'];


    const hitSound = new Audio('sounds/swish.m4a');//adding the hit sound
    const winSound = new Audio('sounds/cash.mp3');
    const loseSound = new Audio('sounds/aww.mp3');


    
    document.querySelector('#blackjack-hit').addEventListener('click', blackjackHit);//new way to add event without modifying html file
    document.querySelector('#blackjack-stand').addEventListener('click', blackjackStand);
    document.querySelector('#blackjack-deal').addEventListener('click', blackjackDeal);



    function randomCard()//function to generate random cards
    {
       let randomIndex=Math.floor(Math.random()*13);
       return blackjackGame['cards'][randomIndex];
   }
    function updateScore(card,activePlayer)//to update the score.
    {
        if(card === 'A')//if adding 11 keeps you below 21 add 11 else add 1.
        {
            if(activePlayer['score']+blackjackGame['cardsMap'][card][1] <= 21){
                activePlayer['score']+=blackjackGame['cardsMap'][card][1];//1st index of 'A' in cardsMap
            }
            else{
                activePlayer['score']+=blackjackGame['cardsMap'][card][0];
            }
        }
        else{
            activePlayer['score']+=blackjackGame['cardsMap'][card];//to get the value of the particular card and then increment
        }

    }
    function showScore(activePlayer)//Keep track of the score of the cards
    {
        if(activePlayer['score'] > 21)
        {
            document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
            document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        }
        else{
            document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']; 
        }//replace the 0-scoreSpan id stored in dictionary and set it to the score 
    }
    function showCard(card,activePlayer)//which card to display on hitting either hit or stand in the resp divs.
    {
        if(activePlayer['score']<=21){
            let cardImage = document.createElement('img');
            cardImage.src=`images/${card}.png`;//template string used instead of string concatenation
            document.querySelector(activePlayer['div']).appendChild(cardImage);/* activePlayer either YOU or DEALER go back to blackjack game object and select the value of 'div' key which is the id of the your-box/dealer-box div in html and add the image there. */
            hitSound.play();
        }
        else{

        }
    }



    function blackjackHit() //what happens when you press hit
    {
        let card=randomCard();    
        showCard(card,YOU);
        updateScore(card,YOU);//affects the score in the dictionary which gets updated and needs to be displayed on front end.
        showScore(YOU);
     }
    function blackjackStand(){
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
    }



    
    function blackjackDeal(){
        showResult(computeWinner());
        let yourImages = document.querySelector('#your-box').querySelectorAll('img')//array of all the images from the div with id="your-box". 
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
        for(let i=0;i<yourImages.length;i++)
        {
            yourImages[i].remove();
        }
        for(let i=0;i<dealerImages.length;i++)
        {
            dealerImages[i].remove();
        }


        YOU['score'] = 0;//resetting the scores internally
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = '#ffffff';
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).style.color = '#ffffff';       
    }

    function computeWinner()
    {
        let winner;

        //1st case when your score <=21
        if(YOU['score']<=21)
        {
            if((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21))
            {
                blackjackGame['wins']++;
                winner = YOU;
            }
            else if(YOU['score'] < DEALER['score'])
            {
                blackjackGame['losses']++;
                winner = DEALER;
            }
            else if(YOU['score'] === DEALER['score'])
            {
                blackjackGame['losses']++;
            }
        }
        else if(YOU['score']>21 && DEALER['score']<=21)
        {
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if(YOU['score']>21 && DEALER['score']>21)
        {
            blackjackGame['draws']++;
        }
        return winner;
    }

    function showResult(winner)
    {
        let message, messageColor;
        
        if(winner === YOU)
        {
            document.querySelector('#wins').textContent =blackjackGame['wins'];
            message='You Won!';
            messageColor='green';
            winSound.play();
        }
        else if(winner === DEALER)
        {
            document.querySelector('#losses').textContent =blackjackGame['losses'];
            message='You Lost!';
            messageColor='red';
            loseSound.play();
        }
        else{
            document.querySelector('#draws').textContent =blackjackGame['draws'];
            message='You Drew!';
            messageColor='yellow';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color= messageColor;
    }