$(document).ready(function(){
  //veljum allt sem er � tagginu ul og me� klasann ratingStars og allt � tagginu li sem er me� klasann active.
  //prevAll velur �ll "sibling element" fyrir framan, � �essi skipti �ll li t�gg sem eru � undan �v� sem er me� active klasann og addClass b�ti klasanum active � �au �ll
  $('ul.ratingStars li.active').prevAll().addClass('active');
  
  
  //veljum ul taggi� me� ratingStars og .each ���ir a� k��inn � fallinu � a� virka fyrir hvert eitt og einasta
  //�a� item sem er vali� � hvert skipti (this) er sett � $item
  //finnur hva�a ul tagg er utan um li taggi� sem vi� erum a� vinna me� og setur �a� � breytuna $itemContainer
  //Finnur hva�a id er � �v� ul taggi og setur � breytuna containerID
  //Finnur �au li t�gg sem er � �v� id taggi og setur � breytuna $itemsALL
  $('ul.ratingStars li').each(function(){
    var $item = $(this);
    var $itemContainer = $item.parents('ul.ratingStars');
    var containerID = $itemContainer.attr('id');
    var $itemsAll = $itemContainer.find('li');
    
    
  //�egar fari� er me� m�sina yfir �a� sem er � breytunni $item virkjast �etta fall
  //Allt sem er � $itemsAll breytunni f�r klasann default sem ���ir gr�/�litu� stjarna
  //�ll "sibling element" sem eru � undan og sj�lft elementi� sem m�sin er ofan� eru valin og f� klasann higlighted, sem ���ir rau� stjarna
  
    $item
    .mouseover(function(){
      $itemsAll.addClass('default');
      $item.prevAll().addClass('highlighted');
    })
  
  //�egar m�sin fer af �v� sem er � $item breytunni a� �� virkjast �etta fall
  //Tekin er � burtu clasinn default og highlighted sem hefur �� �hrif a� allt � �essari $item breytu f�r klasana sem �au voru me� � "minninu"
    
    .mouseout(function(){
      $itemsAll.removeClass('default').removeClass('highlighted');
    })
  
  //on virkjast �egar �kve�in a�ger� er framkv�md � �a� sem er � $item breytunni, � �etta skipti er �a� m�sarsmellur (click) og virkjast �� �etta fall 
  //N�r � sta�setningu (index) � �essu sem er smellt � � $itemsALL breytunni og sta�setninginn sett � breytuna itemIndex
  
    .on('click', function(){
      var itemIndex = $itemsAll.index(this);
      
      
  //Virkjar skjali� saveRating.php og sendir innihaldi� � breytunum containerID og itemIndex me� post a�fer�inni
  //ef �a� koma einhvern g�gn tilbaka (data) og inn� breytunni data.status er innihaldi� 100, �� virkjast �essi if setning
  //�� f�r �a� sem er inn� item klasann active og tekin er � burtu klasinn highlighted
  //�ll n�stu "sibling element" missa klasann active og �ll "sibling element" � undan f� klasann active
  //ef �a� var ekkert � data e�a ekki 100 inn� breytunni data.status, �� virkja�ist else 
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