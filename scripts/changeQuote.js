const projectName = 'random-quote-machine';
let quotesData;

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];
var currentQuote = '';
var currentAuthor = '';

function getQuotes() {
    return $.ajax({
      headers: {
        Accept: 'application/json'
      },
      url:
        'https://gist.githubusercontent.com/ye-song/64d25d5f69cd278a04ec4f8d583ae27a/raw/a8f052257de199d0e53fc1636262c833c2778e9a/quotes.JSON',
      success: function (jsonQuotes) {
        if (typeof jsonQuotes === 'string') {
          quotesData = JSON.parse(jsonQuotes);
          console.log('quotesData');
          console.log(quotesData);
        }
      }
    });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}


function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
/*
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent('"' + currentQuote + '" ' + '-' + currentAuthor)
  );
*/
  $('#tumblr-quote').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' +
      encodeURIComponent(currentAuthor) +
      '&content=' +
      encodeURIComponent(currentQuote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );

  $('#text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text('"'+ randomQuote.quote + '"');
  });

  $('#author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html('-' + randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

function twitter() {
    return window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + currentQuote + '" ' + '-' + currentAuthor),
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=1300,height=300,width=450");
}

function linkedin() {
    return window.open("https://www.linkedin.com/sharing/share-offsite/?url=https://ye-song.github.io/Quote-machine/",
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,height=400,width=450");
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
  $('#linkedin-quote').on('click', linkedin);
  $('#tweet-quote').on('click', twitter);
// Usable Code snippet for sharing button to be added in (document).ready(function)
// if I ever want to try
/*
  $("#btn_shareFB").click(function() {
	window.open('https://www.facebook.com/sharer/sharer.php?u='+url,
			  'facebook-share-dialog',
			  opts);
  });

  $("#btn_shareTWI").click(function() {
    window.open('https://twitter.com/share?text=Share%20with%20twitter%20is%20so%20easy',
			  'twitter-sahre-dialog',
			  opts);
  });
*/
});
