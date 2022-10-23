function drawGameboard()
{
	var htmlCode = "";
	for (i=0;i<6;i++)
	{
		htmlCode += "<tr>";
		for (j=0;j<7;j++)
		{
			htmlCode += "<td id='"+i+j+"'></td>";
		}
		htmlCode += "</tr>";
	}
	$('table')[0].innerHTML = htmlCode;
}

drawGameboard();

var gameStarted = true;
var turn = (Math.random() > 0.5) ? "blue" : "red";
var cells = $("td");
var info = $("#info")[0];

function changeTurn()
{
	if (turn === "blue") turn = "red";
	else turn = "blue";
	info.textContent = turn[0].toUpperCase() + turn.substr(1,) + "'s Turn";
}

function gameOver()
{
	function freeze()
	{
		gameStarted = false;
		if (turn == "red")
		{
			info.textContent = "Blue wins!";
		} 
		else 
		{
			info.textContent = "Red wins!";
		}
		
		for (cell of cells)
		{
			cell.style.cursor = "default";
		}
	}
	
	for (i=0;i<6;i++)
	{
		for (j=0;j<4;j++)
		{
			if (($('#'+i+''+j+'')[0].className === $('#'+i+''+(j+1)+'')[0].className &&
			$('#'+i+''+(j+1)+'')[0].className === $('#'+i+''+(j+2)+'')[0].className &&
			$('#'+i+''+(j+2)+'')[0].className === $('#'+i+''+(j+3)+'')[0].className &&
			$('#'+i+''+j+'')[0].className != ''))
			{
				freeze()
			}
		}
	}
	
	for (i=0;i<3;i++)
	{
		for (j=0;j<7;j++)
		{
			if (($('#'+i+''+j+'')[0].className === $('#'+(i+1)+''+j+'')[0].className &&
			$('#'+(i+1)+''+j+'')[0].className === $('#'+(i+2)+''+j+'')[0].className &&
			$('#'+(i+2)+''+j+'')[0].className === $('#'+(i+3)+''+j+'')[0].className &&
			$('#'+i+''+j+'')[0].className != ''))
			{
				freeze()
			}
		}
	}
	
	for (i=0;i<3;i++)
	{
		for (j=0;j<4;j++)
		{
			if ((($('#'+i+''+j+'')[0].className === $('#'+(i+1)+''+(j+1)+'')[0].className &&
			$('#'+(i+1)+''+(j+1)+'')[0].className === $('#'+(i+2)+''+(j+2)+'')[0].className &&
			$('#'+(i+2)+''+(j+2)+'')[0].className === $('#'+(i+3)+''+(j+3)+'')[0].className &&
			$('#'+i+''+j+'')[0].className != '')) ||
			(($('#'+i+''+(j+3)+'')[0].className === $('#'+(i+1)+''+(j+2)+'')[0].className &&
			$('#'+(i+1)+''+(j+2)+'')[0].className === $('#'+(i+2)+''+(j+1)+'')[0].className &&
			$('#'+(i+2)+''+(j+1)+'')[0].className === $('#'+(i+3)+''+j+'')[0].className &&
			$('#'+i+''+(j+3)+'')[0].className != '')))
			{
				freeze()
			}
		}
	}
}

function editCell()
{
	if (this.className === "" && gameStarted)
	{
		var currId = this.id;
		var col = parseInt(currId[0]);
		var row = currId[1];
		while(col < 5)
		{
			nextId = "#"+(col+1)+""+row;
			if ($(nextId)[0].className === "")
			{
				col++;
			}
			else
			{
				break;
			}
		}

		if (turn === "blue") $("#"+col+""+row)[0].className = "blueChips";
		else $("#"+col+""+row)[0].className = "redChips";
			
		changeTurn();
		gameOver();
	}
}

for (cell of cells)
{
	cell.addEventListener("click", editCell);
}