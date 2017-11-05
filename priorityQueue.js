/**
 * 우선순위큐 
 * 
 * 오름차순 정렬
 * 
 * PriorityQueue() 생성자
 * 
 *  enqueue(element , priority)
 *  dequeue();
 *  front();
 * isEmpty()
 * size()
 * print()
 */

module.exports= function(){
	 PriorityQueue= function (){
				this.items = [];
			}


	QueueElement= function (element, priority){
    this.element = element;
    this.priority = priority;
}

PriorityQueue.prototype.enqueue = function(element, priority){
    var queueElement = new QueueElement(element,priority);

    if(this.isEmpty()){ //비어있을경우 그냥추가
        this.items.push(queueElement);
    }else{
        var added = false;

        //기존에 추가된 원소들과 우선순위 비교후 자리찾아 넣기
        for(var i=0; i < this.items.length; i++){
            if(queueElement.priority < this.items[i].priority){
                this.items.splice(i,0,queueElement);
                added = true;
                break;
            }
        }
        //추가될 원소보다 우선순위높은게(숫자작은거) 없을경우 맨앞에 추가
        if(!added){
            this.items.push(queueElement);
        }
    }
}





PriorityQueue.prototype.dequeue = function(){
				return this.items.shift();
			}

PriorityQueue.prototype.front = function(){
				return this.items[0];
			}

PriorityQueue.prototype.isEmpty = function(){
				return this.items.length == 0;
			}

PriorityQueue.prototype.size = function(){
				return this.items.length;
			}

PriorityQueue.prototype.print = function(){
				console.log(this.items.toString());
			}



}

  // module end