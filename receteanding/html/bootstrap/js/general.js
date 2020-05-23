'use strict';

window.onload = () =>
{
	Visual.loader();
}

class Visual
{
	static loader(mostrar = true)
	{
		if(mostrar)
		{
			$('#loader-wrapper').css('display', 'block');
			$('#loader').css('display', 'block');
		}
		else
		{
			$('#loader-wrapper').css('display', 'none');
			$('#loader').css('display', 'none');
		}
	}
}