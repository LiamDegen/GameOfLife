$(function(){

    var tab_cell = [];
    var interval;
    var voisin_vivant;
    var generation = 0;

    $("form").on("submit", function(e) {
        e.preventDefault()
    })
    //géneration du tableau mainGrid
    for (let i = 0; i < 100; i++){
        $("#mainGrid").append("<tr class='row'></tr>")
    }
    for (let j = 0; j < 100; j++){
        $("tr.row").append("<td class='cell'></td>")
    }

    //fonction de génération aléatoir de nombre
    function getRandom (){
        return Math.floor(Math.random() * 100)
    }

    //attribution a toutes les cellule la class alive(black) ou dead(white)
    $(".cell").each(function(index, element){
        let nbr = getRandom()
        if (nbr < 50){
            $(element).addClass("Alive")
        }else{
            $(element).addClass("Dead")
        }
    });

    function startloop (){
        getLifeRule()
        interval = setInterval(getLifeRule, 100)
        // console.log(interval)
    }

    function endloop (){
        interval = clearInterval(interval)
    }

    console.log(tab_cell)

    function getLifeRule () {
        tab_cell = []
        $(".cell").each(function (index,element){
            if ($(element).hasClass("Alive")){
                tab_cell.push(1)
            }
            else{
                tab_cell.push(0)
            }
        })

        $(".cell").each(function (index, element) {

            voisin_vivant = 0

            for (let i = 0; i < 3; i++) {
                if (index > 100) {
                    if (tab_cell[index - 101 + i] == 1) {
                        voisin_vivant++
                    }
                }
                if (tab_cell[index - 1 + i] == 1) {
                    voisin_vivant++
                }
                if (tab_cell[index + 99 + i] == 1) {
                    voisin_vivant++
                }
            }
            if (tab_cell[index] == 1) {
                voisin_vivant -= 1

                console.log(voisin_vivant)
                //solitude
                if (voisin_vivant < 2) {
                    $(element).removeClass("Alive")
                    $(element).addClass("Dead")
                }
                //surpopulation
                else if (voisin_vivant > 3) {
                    $(element).removeClass("Alive")
                    $(element).addClass("Dead")
                }
            }
            else {
                //reproduction
                if (voisin_vivant == 3) {
                    $(element).removeClass("Dead")
                    $(element).addClass("Alive")
                }
            }
        });
        generation++
        $("#generation").html("nbr de génération: " + generation)
    } //fin fonction getLifeRule

    $(document).on("submit", "form", function(){
        startloop()
    })
});