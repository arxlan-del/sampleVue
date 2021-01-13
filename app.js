new Vue({
    el : "#app",
    data: {
        gameStarted : false,
        monster_heal: 100,
        player_heal: 100,
        logs : []
    },
    methods: {
        startGame(){
            this.gameStarted = true;    
        },
        moveAttack(){
            var point = Math.ceil( Math.random() * 10)
            this.monster_heal -= point
            this.moveMonsterAttack()
            this.logPushUp({ turn: "P", text : "Player Attack ("+  point + ") "   })
            
        },
        moveSpecialAttack(){
            var point = Math.ceil( Math.random() * 20)
            this.monster_heal -= point
            this.moveMonsterAttack()
            this.logPushUp({ turn: "P", text : "Player Special Attack ("+  point + ")"   })

            
        },
        healUp(){
            var point = Math.ceil( Math.random() * 20)
            this.player_heal += point
            this.moveMonsterAttack()
            this.logPushUp({ turn: "P", text : "Player Heal Up ("+  point + ")"   })

           
        },
        giveUp(){
            this.player_heal = 0
            this.logPushUp({ turn: "P", text : "Player Give Up!!!"   })

           
        },
        moveMonsterAttack(){
            var point = Math.ceil( Math.random() * 15)
            this.player_heal -= point
            this.logPushUp({ turn: "M", text : "Monster Attack ("+  point + ")"   })

       
        },
        logPushUp(value){
            this.logs.push( value )

        }

    },
    watch: {
        player_heal: function(value){
            if(value <= 0 ){
                this.player_heal = 0    
                if (confirm("You are loser. Do you want to try again!!!")) {
                    this.player_heal = 100    
                    this.monster_heal = 100    
                    this.logs = []
                }
            }
           

            else if(value >= 100){
                this.player_heal = 100  
            }
        },
        monster_heal: function(value){
            if(value <= 0 ){
                this.monster_heal = 0
                if (confirm("You are perfectoo!!!. Do you want to try again!!!")) {
                    this.player_heal = 100    
                    this.monster_heal = 100   
                    this.logs = []
 
                }
            }
           
        }
    }


})