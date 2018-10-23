 $("#timer").countdown(new Date().getTime()+60000000,  function(event) {
                    $(this).text( event.strftime('%-Dd:%Hh:%Mm:%Ss') );
                    if(event.type === 'stoped'){
                      console.log('am stopped')
                      $('#timer').html('TIME UP')
                    }
                     }).on('finish.countdown', function(e){
                        console.log(e)
                      alert('am done')
                   
                    
                  });