new Vue({
    el : "#app",
    data: {
        gameStarted : false,
        monster_heal: 100,
        player_heal: 100,
        logs : [],
        attackMultiple : 10,
        specialAttackMultiple : 20,
        healUpMultiple : 20,
        monsterAttackMultiple: 15,
        log_texts : {
            attack: "Player Attack : ",
            specialAttack : "Player Special Attack : ",
            healUp : "Player Heal Up",
            giveUp : "Player Give Up!!!",
            monsterAttack:  "Monster Attack : "

        }
    },
    methods: {
        startGame(){
            this.gameStarted = true;    
        },
        moveAttack(){
            var point = Math.ceil( Math.random() * this.attackMultiple)
            this.monster_heal -= point
            this.moveMonsterAttack()
            this.logPushUp({ turn: "P", text : this.log_texts.attack +  point   })
            
        },
        moveSpecialAttack(){
            var point = Math.ceil( Math.random() * this.specialAttackMultiple)
            this.monster_heal -= point
            this.moveMonsterAttack()
            this.logPushUp({ turn: "P", text : this.log_texts.specialAttack +  point  })

            
        },
        healUp(){
            var point = Math.ceil( Math.random() * this.healUpMultiple)
            this.player_heal += point
            this.moveMonsterAttack()
            this.logPushUp({ turn: "P", text : this.log_texts.healUp + point    })

           
        },
        giveUp(){
            this.player_heal = 0
            this.logPushUp({ turn: "P", text :  this.log_texts.giveUp })

           
        },
        moveMonsterAttack(){
            var point = Math.ceil( Math.random() * this.monsterAttackMultiple)
            this.player_heal -= point
            this.logPushUp({ turn: "M", text : this.log_texts.monsterAttack  + point  })

       
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
    },

    computed: {
        player_progress : function(){
            return {
                width : this.player_heal + '%'
            }
        },
        monster_progress : function(){
            return {
                width : this.monster_heal + '%'
            }
        }
    }


})