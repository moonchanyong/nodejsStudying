/**
 *
 * replaceAt(string ,  index , 대체할문자 )
 * 
 * 
 * 
 * 
 */

// string change by index

module.exports = function()
{
	
	 replaceAt=function( s,index, replacement) {
		return s.substr(0, index) + replacement+ s.substr(index + replacement.length);
	}
	 
	 
	
	 permutator = (inputArr) => {
		  let result = [];

		  const permute = (arr, m = []) => {
		    if (arr.length === 0) {
		      result.push(m)
		    } else {
		      for (let i = 0; i < arr.length; i++) {
		        let curr = arr.slice();
		        let next = curr.splice(i, 1);
		        permute(curr.slice(), m.concat(next))
		     }
		   }
		 }

		 permute(inputArr)

		 return result;
		}
	 
	 
}
