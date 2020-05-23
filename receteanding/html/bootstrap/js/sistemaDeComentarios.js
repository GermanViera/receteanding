'use strict';

const nroReceta		= parseInt(window.location.href.split('/').slice('-1'));
var sesionIniciada	= false;

window.onload = () =>
{
	AJAXComentarios.corroborarSesion();
	AJAXComentarios.listarComentariosReceta();
}

class AJAXComentarios
{
	static corroborarSesion()
	{
		$.ajax(
		{
			url: "https://receteanding.com/index.php/site_controller/corroborarSesion",
			dataType: 'JSON',
			success: e => CallBackComentarios.corroborarSesion(e),
		});
	}

	static listarComentariosReceta()
	{
		$.ajax(
		{
			type: 'POST',
			url: "https://receteanding.com/index.php/site_controller/listarComentariosReceta",
			data:
			{
				receta:		nroReceta
			},
			dataType: 'JSON',
			beforeSend: () => Visual.loader(),
			success: e => CallBackComentarios.listarComentariosReceta(e),
		});
	}

	static comentarComentario(nroComentario, comentario)
	{
		$.ajax(
		{
			type: 'POST',
			url: "https://receteanding.com/index.php/site_controller/comentarComentario",
			data:
			{
				idReceta:		nroReceta,
				idComentario:	nroComentario,
				comentario:		comentario
			},
			dataType: 'JSON',
			beforeSend: () => Visual.loader(),
			success: e => CallBackComentarios.comentarComentario(e, nroComentario),
		});
	}

	static listarMeGusta()
	{
		$.ajax(
		{
			type: 'POST',
			url: "https://receteanding.com/index.php/site_controller/listarMeGustaReceta",
			data:
			{
				receta:		nroReceta
			},
			dataType: 'JSON',
			beforeSend: () => Visual.loader(),
			success: e => CallBackComentarios.listarMeGusta(e),
		});
	}

	static meGustaComentario(nroComentario)
	{
		$.ajax(
		{
			type: 'POST',
			url: "https://receteanding.com/index.php/site_controller/meGustaComentario",
			data:
			{
				receta:		nroReceta,
				comentario:	nroComentario
			},
			dataType: 'JSON',
			beforeSend: () => Visual.loader(),
			success: e => CallBackComentarios.meGustaComentario(e, nroComentario),
		});
	}
}

class CallBackComentarios
{
	static corroborarSesion(e)
	{
		sesionIniciada = e.sessionIniciada;
	}

	static listarComentariosReceta(e)
	{
		if(e.sinComentarios)
		{
			Visual.loader(false);
		}
		else
		{
			e.forEach(e =>
			{
				if(!document.getElementById(`divComentarioNro${e.id}`))
				{
					let nick = (e.autor)
					? e.nombre + ' <label class="badge" style="background: #7DAF74">autor</label>'
					: e.nombre;
					let nuevoComentario = document.createElement('li');
					nuevoComentario.innerHTML = (sesionIniciada)
					?
					`
					<li class="comment" id="divComentarioNro${e.id}">
						<div class="comment-body clearfix">
							<div class="avatar" style="border:0;">
								<img alt="" class="img-circle" src="${e.foto}" class="img-circle">
							</div>
							<div class="comment-text">
								<div class="author clearfix">
									<div class="comment-meta">
										<span>${nick}</span>
										<div class="date">${e.fecha}</div>
									</div>
								</div>
								<div class="text">
									<p>${e.comentario}</p>
								</div>
								<div>
									<a class="comment-reply" id="botonRespuestaComentario${e.id}" style="cursor: pointer; margin-left: 10px;">Responderle a ${e.nombre}</a>
									<a class="comment-reply" id="meGustaComentario${e.id}" style="cursor: pointer"><span id="boolMeGustaComentario${e.id}"><i class="fa fa-heart-o"></i> Me gusta</span><label for="" id="countMeGustaComentario${e.id}"></label></a>
								</div>
								<div style="display: none;" id="respuestaAlComentario${e.id}Div" class="input-container">
									<input class="input-field" id="respuestaAlComentario${e.id}" type="text" value="@${e.nombre} " placeholder="Responder<!-- el mensaje de ${e.nombre}-->" style="width: 80%; height: 38px">
									<i class="fa fa-send icon" style="cursor:pointer"></i>
								</div>
								<div id="respuestasAlComentario${e.id}" style="width:100%; float:right; margin-top: 10px">
								</div>
							</div>
						</div>
					</li>
					`
					:
					`
					<li class="comment" id="divComentarioNro${e.id}">
						<div class="comment-body clearfix">
							<div class="avatar" style="border:0;">
								<img alt="" class="img-circle" src="${e.foto}" class="img-circle">
							</div>
							<div class="comment-text">
								<div class="author clearfix">
									<div class="comment-meta">
										<span>${nick}</span>
										<div class="date">${e.fecha}</div>
									</div>
								</div>
								<div class="text">
									<p>${e.comentario}</p>
								</div>
								<div id="respuestasAlComentario${e.id}" style="width:100%; float:right; margin-top: 10px">
								</div>
							</div>
						</div>
					</li>
					`;
					document.getElementById('cajaDeComentarios').appendChild(nuevoComentario);

					if(sesionIniciada)
					{
						document.getElementById(`botonRespuestaComentario${e.id}`).addEventListener('click', () =>
						{
							$(`#respuestaAlComentario${e.id}Div`).toggle();
						});

						document.getElementById(`respuestaAlComentario${e.id}`).addEventListener('keydown', el =>
						{
							if(parseInt(el.which) === 13)
							{
								if(ControlComentarios.comentarComentario(e.id))
								{
									AJAXComentarios.comentarComentario(e.id, document.getElementById(`respuestaAlComentario${e.id}`).value);
								}
							}
						});

						document.getElementById(`meGustaComentario${e.id}`).addEventListener('click', el =>
						{
							AJAXComentarios.meGustaComentario(e.id);
						});
					}
				}

				if(e.respuesta)
				{
					if(Array.isArray(e.datosRespuesta))
					{
						e.datosRespuesta.forEach(r =>
						{
							if(!document.getElementById(`respuesta${r.id}`))
							{
								r.nombre = (r.autor)
								? r.nombre + ' <label class="badge" style="background: #7DAF74">autor</label>'
								: r.nombre;
								let nuevaRespuesta = document.createElement('div');
								nuevaRespuesta.innerHTML =
								`
								<div id="respuesta${r.id}">
									<div class="avatar" style="border:0;">
										<img alt="" class="img-circle" src="${r.foto}" class="img-circle">
									</div>
									<div class="comment-text">
										<div class="author clearfix">
											<div class="comment-meta">
												<span>${r.nombre}</span>
												<div class="date">${r.fecha}</div>
											</div>
										</div>
										<div class="text">
											<p>${r.comentario}</p>
										</div>
									</div>
								</div>
								`;
								document.getElementById(`respuestasAlComentario${e.id}`).appendChild(nuevaRespuesta);
							}
						});
					}
					else
					{
						let r = e.datosRespuesta;
						if(!document.getElementById(`respuesta${r.id}`))
						{
							let nuevaRespuesta = document.createElement('div');
							nuevaRespuesta.innerHTML =
							`
							<div id="respuesta${r.id}">
								<div class="avatar" style="border:0;">
									<img alt="" class="img-circle" src="${r.foto}" class="img-circle">
								</div>
								<div class="comment-text">
									<div class="author clearfix">
										<div class="comment-meta">
											<span>${r.nombre}</span>
											<div class="date">${r.fecha}</div>
										</div>
									</div>
									<div class="text">
										<p>${r.comentario}</p>
									</div>
								</div>
							</div>
							`;
							document.getElementById(`respuestasAlComentario${e.id}`).appendChild(nuevaRespuesta);
						}
					}
				}
			});
			if(sesionIniciada) AJAXComentarios.listarMeGusta();
			else Visual.loader(false);
		}
	}


	static comentarComentario(e, nroComentario)
	{
		if(e.correcto)
		{
			$(`#respuestaAlComentario${nroComentario}Div`).toggle();
			document.getElementById(`respuestaAlComentario${nroComentario}`).value = document.getElementById(`respuestaAlComentario${nroComentario}`).value.trim().split(' ', 1);
			AJAXComentarios.listarComentariosReceta();
		}
		else if(e.error)
		{
			alert('Ha ocurrido un error al intentar comentar.');
		}

		Visual.loader(false);
	}

	static listarMeGusta(e)
	{
		if(e.length !== 0)
		{
			if(Array.isArray(e))
			{
				e.forEach(e =>
				{
					if(e.mg)
					{
						document.getElementById(`boolMeGustaComentario${e.id}`).innerHTML	= 'Ya no me gusta.';
						document.getElementById(`countMeGustaComentario${e.id}`).innerHTML = (isNaN(parseInt(document.getElementById(`countMeGustaComentario${e.id}`).innerHTML)))
							? 1
							: parseInt(document.getElementById(`countMeGustaComentario${e.id}`).innerHTML) + 1;
					}
					else
						document.getElementById(`countMeGustaComentario${e.id}`).innerHTML = (isNaN(parseInt(document.getElementById(`countMeGustaComentario${e.id}`).innerHTML)))
							? 1
							: parseInt(document.getElementById(`countMeGustaComentario${e.id}`).innerHTML) + 1;
				});
			}
			else
			{
				if(e.mg)
				{
					document.getElementById(`boolMeGustaComentario${e.id}`).innerHTML	= 'Ya no me gusta.';
					document.getElementById(`countMeGustaComentario${e.id}`).innerHTML	= '1';
				}
				else
					document.getElementById(`countMeGustaComentario${e.id}`).innerHTML = '1';
			}
		}

		Visual.loader(false);
	}

	static meGustaComentario(e, nroComentario)
	{
		if(e.correcto)
		{
			if(e.insert)
			{
				document.getElementById(`boolMeGustaComentario${nroComentario}`).innerHTML	= 'Ya no me gusta.';
				document.getElementById(`countMeGustaComentario${nroComentario}`).innerHTML = (isNaN(parseInt(document.getElementById(`countMeGustaComentario${nroComentario}`).innerHTML)))
					? 1
					: parseInt(document.getElementById(`countMeGustaComentario${nroComentario}`).innerHTML) + 1;
			}
			else if(e.delete)
			{
				document.getElementById(`boolMeGustaComentario${nroComentario}`).innerHTML	= 'Me gusta.';
				document.getElementById(`countMeGustaComentario${nroComentario}`).innerHTML = parseInt(document.getElementById(`countMeGustaComentario${nroComentario}`).innerHTML) - 1;

				if(parseInt(document.getElementById(`countMeGustaComentario${nroComentario}`).innerHTML) === 0)
					document.getElementById(`countMeGustaComentario${nroComentario}`).innerHTML = '';
			}
		}
		else if(e.error)
		{
			alert("Ha ocurrido un error crítico\nSe recargará la página.");
		}

		Visual.loader(false);
	}
}

class ControlComentarios
{
	static comentarComentario(idRespuesta)
	{
		const recetaURL = parseInt(window.location.href.split('/').slice('-1'));
		let control = true;
		if(parseInt(nroReceta) !== parseInt(recetaURL))
			control = false;
		else if(document.getElementById(`respuestaAlComentario${idRespuesta}`).value.length === 0)
			control = false;
		else if(document.getElementById(`respuestaAlComentario${idRespuesta}`).value.trim().split(' ') < 2)
			control = false;

		return control;
	}
}