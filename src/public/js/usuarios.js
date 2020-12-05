
function seleccionar_rol_usuario(){
    $.ajax({
        url: 'api-usuarios/roles',
        method: 'GET',
        dataType: 'json',

        success: function(rol){
            let i
            let opcion_rol 
            for(i = 0; i < rol.length; i++){
                opcion_rol += '<option value="'+rol[i].id+'"> '+rol[i].nombre+' </option>'
            }
           
            $('#rol').html(opcion_rol)
        }
    })
}




function datos_usuario(){

    $.ajax({
        url: 'api-usuarios',
        method: 'GET',
        dataType: 'json',

        success: function(respuesta){
            lista_usario(respuesta)
        }
    })
}


function lista_usario(categorias){
    let i 
    $('#lista_usario').children('tbody').html('')
    if(categorias.length > 0){
        let filaCategoria
      
console.log(categorias)
        for(i = 0; i < categorias.length; i++){
            let botones
            if(categorias[i].User.condicion === 0){
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrar_datos_usuario('+categorias[i].User.id+')">Editar</button> <button type="button" class="btn btn-danger btn-sm" onclick="deshabilitar_usuario('+categorias[i].User.id+')">Deshabilitar</button>'
          
            }else{
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrar_datos_usuario('+categorias[i].User.id+')">Editar</button> <button type="button" class="btn btn-success btn-sm" onclick="habilitar_usuario('+categorias[i].User.id+')">Habilitar</button>'
            }

            filaCategoria += '<tr><td>'+categorias[i].id+'</td><td>'+categorias[i].nombre+'</td><td>'+categorias[i].telefono+'</td><td>'+categorias[i].email+'</td><td>'+categorias[i].User.usuario+'</td><td>'+botones+'</td><tr>'
        }

        $('#lista_usario').children('tbody').html(filaCategoria)
    }else{
        $('#lista_usario').children('tbody').html('<tr><td colspan="6" class="text-center">No se encontro ningun Usuario</td></tr>')
    }
}





function agregar_usuario(){
    $('#contedor_registro').show('ease') 
    $('#contedor_registro .title').text('Registrar Usuario')
    $('#boton_registra_usuario').val('Registrar usuario')
    limpiar_contenedor_registro()
}

function cancelar_registro_usuario(){
    $('#contedor_registro').hide('ease')
    limpiar_contenedor_registro()
}

function limpiar_contenedor_registro(){
   
    $('#dni_usario').val('')
    $('#nombre_usuario').val('')
    $('#telefono_usuario').val('')
    $('#email_usuario').val('')
    $('#direccion_usuario').val('')
    $('#usuario').val('')
    $('#password').val('')
    $('#rol').val('')
}


function registrar_usuario(){
    const dni_usario = $('#dni_usario').val()
    const nombre = $('#nombre_usuario').val()
    const telefono = $('#telefono_usuario').val()
    const email = $('#email_usuario').val()
    const direccion = $('#direccion_usuario').val()
    const usuario = $('#usuario').val()
    const password = $('#password').val()
    const rol = $('#rol').val()

    if(dni_usario !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== '' && usuario !== '' && password !== '' && rol !== ''){
        const datos = {
            num_documento: dni_usario,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion,
            usuario: usuario,
            password: password,
            rol: rol

        }
    
        $.ajax({
            url: 'api-usuarios/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Registro exitoso</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contedor_registro').hide()
                    limpiar_contenedor_registro()
                    datos_usuario()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Fallo en el registro del usuario</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}





function mostrar_datos_usuario(id){
    $.ajax({
        url: 'api-usuarios/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){

            if(respuesta){
                $('#contedor_registro').hide('ease')
                $('#id_usuario').val(respuesta.id)
                $('#dni_usario').val(respuesta.num_documento)
               
                
                $('#nombre_usuario').val(respuesta.nombre)
                $('#telefono_usuario').val(respuesta.telefono)
                $('#email_usuario').val(respuesta.email)
                $('#direccion_usuario').val(respuesta.direccion)
                $('#usuario').val(respuesta.User.usuario)
                $('#password').val(respuesta.User.password)
                $('#rol').val(respuesta.User.idrol)

                $('#contedor_registro .title').text('Editar usuario')
                $('#boton_registra_usuario').val('Editar usuario')
                $('#contedor_registro').show('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i>  datos no encontrados de la categoria </label>')
            }
            
        }
    })
}


function editar_usuario(){

    const id = $('#id_usuario').val()
    const dni_usario = $('#dni_usario').val()
    const nombre = $('#nombre_usuario').val()
    const telefono = $('#telefono_usuario').val()
    const email = $('#email_usuario').val()
    const direccion = $('#direccion_usuario').val()
    const usuario = $('#usuario').val()
    const password = $('#password').val()
    const rol = $('#rol').val()
   
    // console.log(id,dni_usario,nombre,telefono,email,direccion,telefono,email,direccion,usuario,password,rol)
    if(dni_usario !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== '' && usuario !== '' && password !== '' && rol !== ''){
        console.log("editando")
        const datos = {
            id: id,
            num_documento: dni_usario,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion,
            usuario: usuario,
            password: password,
            rol: rol
        }



        $.ajax({
            url: 'api-usuarios/actualizar/'+id,
            method: 'PATCH',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
            
            success: function(respuesta){
            
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Usuario Actualizado </label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contedor_registro').hide()
                    limpiar_contenedor_registro()
                    datos_usuario()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Usuario no se pudo actualizar</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío(s) </span>')
    }
}


/*function editar_usuario(){
    console.log("esto esta editando")
    const id = $('#idusuario').val()

    const dni_usario = $('#dni_usario').val()
    const nombre = $('#nombre_usuario').val()
    const telefono = $('#telefono_usuario').val()
    const email = $('#email_usuario').val()
    const direccion = $('#direccion_usuario').val()
    const usuario = $('#usuario').val()
    const  password= $('#password').val()
    const rol_usuario = $('#rol').val()
    

    if(dni_usario !== '' || nombre !== '' || telefono !== '' || email !== '' || direccion !== '' || usuario !== '' || password !== ''){
        const datos = {
            id: id,
            num_documento:dni_usario,
            nombre: nombre,
           
            telefono: telefono,
            email: email,
            direccion: direccion,
            usuario : usuario,
            password:password,
            idrol:rol_usuario
        }

        $.ajax({
            url: 'api-usuarios/actualizar/'+id,
            method: 'PATCH',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i>  Actualización exitosa</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contedor_registro').hide()
                    limpiar_contenedor_registro()
                    datos_usuario()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Actualización fallida</label>')
                }
            }
        })
    }else{
        console.log('no hace nada')
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío(s) </span>')
    }
}*/

function deshabilitar_usuario(id){
    $.ajax({
        url: 'api-usuarios/desactivar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                datos_usuario()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Usuario no se pudo deshabilitar </label>')
            }
        }
    })
}

function habilitar_usuario(id){
    $.ajax({
        url: 'api-usuarios/activar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                datos_usuario()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Categoria no se pudo activar !!</label>')
            }
        }
    })
}


function buscar_usuario(){
    
    const usuario = $('#buscar_usu').val()
    if(usuario !== ''){
        $.ajax({
            url: 'api-usuarios/buscar/'+usuario,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(usuarios){
                $('.alerta-buscador').html('')
                lista_usario(usuarios)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Debe ingresar un dato para buscar')
    }
}