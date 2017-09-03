$(document).ready(function(){
  //veljum allt sem er í tagginu ul og með klasann ratingStars og allt í tagginu li sem er með klasann active.
  //prevAll velur öll "sibling element" fyrir framan, í þessi skipti öll li tögg sem eru á undan því sem er með active klasann og addClass bæti klasanum active á þau öll
  $('ul.ratingStars li.active').prevAll().addClass('active');
  
  
  //veljum ul taggið með ratingStars og .each þýðir að kóðinn í fallinu á að virka fyrir hvert eitt og einasta
  //Það item sem er valið í hvert skipti (this) er sett í $item
  //finnur hvaða ul tagg er utan um li taggið sem við erum að vinna með og setur það í breytuna $itemContainer
  //Finnur hvaða id er á því ul taggi og setur í breytuna containerID
  //Finnur þau li tögg sem er í því id taggi og setur í breytuna $itemsALL
  $('ul.ratingStars li').each(function(){
    var $item = $(this);
    var $itemContainer = $item.parents('ul.ratingStars');
    var containerID = $itemContainer.attr('id');
    var $itemsAll = $itemContainer.find('li');
    
    
  //þegar farið er með músina yfir það sem er í breytunni $item virkjast þetta fall
  //Allt sem er í $itemsAll breytunni fær klasann default sem þýðir grá/ólituð stjarna
  //Öll "sibling element" sem eru á undan og sjálft elementið sem músin er ofaná eru valin og fá klasann higlighted, sem þýðir rauð stjarna
  
    $item
    .mouseover(function(){
      $itemsAll.addClass('default');
      $item.prevAll().addClass('highlighted');
    })
  
  //þegar músin fer af því sem er í $item breytunni að þá virkjast þetta fall
  //Tekin er í burtu clasinn default og highlighted sem hefur þó áhrif að allt í þessari $item breytu fær klasana sem þau voru með í "minninu"
    
    .mouseout(function(){
      $itemsAll.removeClass('default').removeClass('highlighted');
    })
  
  //on virkjast þegar ákveðin aðgerð er framkvæmd á það sem er í $item breytunni, í þetta skipti er það músarsmellur (click) og virkjast þá þetta fall 
  //Nær í staðsetningu (index) á þessu sem er smellt á í $itemsALL breytunni og staðsetninginn sett í breytuna itemIndex
  
    .on('click', function(){
      var itemIndex = $itemsAll.index(this);
      
      
  //Virkjar skjalið saveRating.php og sendir innihaldið í breytunum containerID og itemIndex með post aðferðinni
  //ef það koma einhvern gögn tilbaka (data) og inní breytunni data.status er innihaldið 100, þá virkjast þessi if setning
  //Þá fær það sem er inní item klasann active og tekin er í burtu klasinn highlighted
  //öll næstu "sibling element" missa klasann active og öll "sibling element" á undan fá klasann active
  //ef það var ekkert í data eða ekki 100 inní breytunni data.status, þá virkjaðist else 
      $.post('saveRating.php', {'itemID':containerID, 'itemValue': itemIndex}, function(data) {
        if(data && data.status == "100"){
          $item.addClass('active').removeClass('highlighted');
          $item.nextAll().removeClass('active');
          $item.prevAll().addClass('active');
        } else {
          alert('Error!');
        } 
      }, "json");
    });	
  });
});