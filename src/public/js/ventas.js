function datos_ventas(){
    $.ajax({
        url: 'api-ventas',
        method: 'GET',
        dataType: 'json',

        success: function(ventas){
          
            listar_ventas(ventas)
        },
    })
}

function listar_ventas(ventas){
    let i
    
    $('#listado_ventas').children('tbody').html('')
    if(ventas.length > 0){
        let fila_ventas
        for(i = 0; i < ventas.length; i++){
            let botones

            if(ventas[i].Persona !== null){
                if(ventas[i].estado === 'Aprobado'){
                    botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrar_datos_ventas('+ventas[i].id+')">Detalles</button> <button type="button" class="btn btn-danger btn-sm" onclick="anular_ventas('+ventas[i].id+')">Anular Venta</button></td></tr>'
                }else{
                    botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrar_datos_ventas('+ventas[i].id+')">Detalles</button>'
                }

                fila_ventas += '<tr><td>'+ventas[i].fecha_hora+'</td><td>'+ventas[i].Persona.nombre+'</td><td>'+ventas[i].tipo_comprobante+': '+ventas[i].serie_comprobante+':'+ventas[i].num_comprobante+'</td><td>'+ventas[i].impuesto+'</td><td>'+ventas[i].total+'</td><td>'+ventas[i].estado+'</td><td>'+botones+'</td>'
            }
        }

        console.log()

        $('#listado_ventas').children('tbody').html(fila_ventas)
    }else{
        $('#listado_ventas').children('tbody').html('<tr><td colspan="7" class="text-center">No se encontro ningu Ventas.</td></tr>')
    }
}

function agregar_venta(){
    $('#contenedor_registro').show('ease') 
    $('#contenedor_registro .title').text('Registrar Ventas')
    $('#bonton_registrar_ventas').val('Registrar Ventas')
    limpiar_formulario_venta()
}

function cancelar_registro_ventas(){
    $('#contenedor_registro').hide('ease')
    limpiar_formulario_venta()
}

function limpiar_formulario_venta(){
    
    $('#cliente').val('')
    $('#tipo_comprobante').val('')
    $('#serie_comprobante').val('')
    $('#numero_comprobante').val('')
    $('#productos').val(0)
    $('#cantidad').val('')
    $('#precio').val('')

    $('#productos').parent().show()
    $('#cantidad').parent().show()
    $('#precio').parent().show()
    $('#boton_agregar_producto').parent().show()
    $('#lista_productos').children('tbody').html('')
    $('#bonton_registrar_ventas').show()

    

    $('#bonton_registrar_ventas').text('Registrar Ventas')
    $('#contenedor_registro').children('.title').text('Registrar Ventas')
}

function registrar_venta(){
    const cliente = $('#cliente').val()
    const tipo_comprobante = $('#tipo_comprobante').val()
    const serie_comprobante = $('#serie_comprobante').val()
    const numero_comprobante = $('#numero_comprobante').val()
    const producto = $('.producto')
    const cantidad = $('.cantidad')
    const precio = $('.precio')
    const impuesto = $('#impuesto').val()
    const total = $('#total').val()

    let i
    const productos = []
    const cantidades = []
    const precios = []
    console.log(serie_comprobante)

    for(i = 0; i < producto.length; i++){
        productos.push($(producto[i]).val())
        cantidades.push($(cantidad[i]).val())
        precios.push($(precio[i]).val())
    }

    if(cliente !== '' && tipo_comprobante !== '' && serie_comprobante !== '' && numero_comprobante !== '' && productos.length !== 0 && cantidades.length !== 0 && precios !== 0){
        let datos = {
            idcliente: cliente,
            tipo_comprobante: tipo_comprobante,
            serie_comprobante: serie_comprobante,
            num_comprobante: numero_comprobante,
            articulos: productos,
            cantidades: cantidades,
            precios: precios,
            impuesto: impuesto,
            total: total
        }
         console.log(datos)
        datos = JSON.stringify(datos)
        $.ajax({
            url: 'api-ventas/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'json',
    
            success: function(respuesta){
                
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i>  Registro exitoso</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contenedor_registro').hide()
                    limpiar_formulario_venta()
                    datos_ventas()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Venta no se pudo registrar </label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío(s) </span>')
    }
}

function lista_cliente(){
    $.ajax({
        url: 'api-ventas/lista_cliente',
        method: 'GET',
        dataType: 'json',

        success: function(respuesta){
            let opciones_clientes = ''
            let i
            for(i = 0; i < respuesta.length; i++){
                opciones_clientes += '<option value="'+respuesta[i].id+'">'+respuesta[i].nombre+'</option>'
            } 
            $('#cliente').html(opciones_clientes)  
        }
    })
}

function lista_productos(){
    $.ajax({
        url: 'api-ventas/listaproductos',
        method: 'GET',
        dataType: 'json',

        success: function(respuesta){
            let opcionesProductos = ''
            let i
            for(i = 0; i < respuesta.length; i++){
                opcionesProductos += '<option value="'+respuesta[i].id+'">'+respuesta[i].nombre+'</option>'
            } 
            $('#productos').html(opcionesProductos)  
        }
    })
}

function agregar_producto(){
    const producto = $('#productos').val()
    const cantidad = $('#cantidad').val()
    const precio = $('#precio').val()

    if(producto !== 0 && cantidad !== '' && precio !== ''){
        $.ajax({
            url: 'api-ventas/producto/'+producto,
            method: 'GET',
            dataType: 'json',

            success: function(respuesta){

                let filaProducto = '<tr><td><button class="btn btn-warning btn-sm" onclick="eliminar_articulo_lista(this)" "><span class="fa fa-times"></span></button></td><td><input type="hidden" class="producto" value="'+respuesta.id+'">'+respuesta.codigo+' '+respuesta.nombre+'</td><td><input type="hidden" class="cantidad" value="'+cantidad+'">'+cantidad+'</td><td><input type="hidden" class="precio" value="'+precio+'">'+precio+'</td><td class="subTotal">'+(cantidad*precio).toFixed(2)+'</td></tr>'

                $('#lista_productos').children('tbody').append(filaProducto)

                if($('.subTotal').length > 0){
                    const subTotal = $('.subTotal')
                    let i 
                    let total = 0
                    let impuesto = 0

                    for(i = 0; i < subTotal.length; i++){
                        total += parseFloat($(subTotal[i]).text())
                    }

                    impuesto = total * 0.16
                    total += impuesto

                    $('#productos').val(1)
                    $('#cantidad').val('')
                    $('#precio').val('')

                    $('#impuesto').val(impuesto.toFixed(2))
                    $('#datos_impustos').text('Bs/'+impuesto.toFixed(2))
                    $('#total').val(total.toFixed(2))
                    $('#datoTotal').text('Bs/'+total.toFixed(2))
                }
            }
        })
    }
}

function mostrar_datos_ventas(id){
    $.ajax({
        url: 'api-ventas/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            console.log(respuesta)
            if(respuesta){


                $('#contenedor_registro').hide('ease')
                $('#productos').parent().hide()
                $('#cantidad').parent().hide()
                $('#precio').parent().hide()
                $('#boton_agregar_producto').parent().hide()
               
                $('#contenedor_registro .title').text('Detalle de venta ')
               
              

                $('#cliente').val(respuesta[0].idcliente)
                $('#tipo_comprobante').val(respuesta[0].tipo_comprobante)
                $('#serie_comprobante').val(respuesta[0].serie_comprobante)
                $('#numero_comprobante').val(respuesta[0].num_comprobante)
                $('#datos_impustos').text('Bs/'+respuesta[0].impuesto)
                $('#datoTotal').text('Bs/'+respuesta[0].total)

                let i
                let lista_productos

                for(i = 0; i < respuesta.length; i++){
                    const detalle = respuesta[i].DetalleV
                    
                    lista_productos += '<tr><td></td><td>'+detalle.Articulo.codigo+' '+detalle.Articulo.nombre+'</td><td>'+detalle.cantidad+'</td><td>'+detalle.precio+'</td><td>'+(detalle.cantidad*detalle.precio).toFixed(2)+'</td></tr>'
                   // lista_productos += '<tr><td></td><td>'+detalle.Articulo.codigo+'</td></tr>'
                }

                $('#lista_productos').children('tbody').html(lista_productos)
                $('#bonton_registrar_ventas').hide()
                $('#boton_cancelar title').text(' Ocultar detalles ')
                $('#contenedor_registro').show('ease')
               

                

               
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se encontraron datos de la venta </label>')
            }
        }
    })
}


function anular_ventas(id){
    $.ajax({
        url:'api-ventas/anular/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Venta Anulado </label>')
                setTimeout(function(){
                    $('.alerta').html('')
                },5000)
                datos_ventas()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Venta no se pudo anular </label>')
            }
        }
    })
}

function buscar_ventas(){
    const ventas = $('#buscar_ventas').val()

    if(ventas !== ''){
        $.ajax({
            url: 'api-ventas/buscar/'+ventas,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(ventas){
                $('.alerta-buscador').html('')
                listar_ventas(ventas)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Ingrese un dato para buscar ')
    }

}



function eliminar_articulo_lista(input){
    const filaProducto = $(input).parent().parent()
    filaProducto.remove()

    if($('.subTotal').length > 0){
        const subTotal = $('.subTotal')
        let i 
        let total = 0
        let impuesto = 0

        for(i = 0; i < subTotal.length; i++){
            total += parseFloat($(subTotal[i]).text())
        }

        impuesto = total * 0.16
        total += impuesto

        $('#productos').val(1)
        $('#cantidad').val('')
        $('#precio').val('')

        $('#impuesto').val(impuesto.toFixed(2))
        $('#datos_impustos').text('Bs/'+impuesto.toFixed(2))
        $('#total').val(total.toFixed(2))
        $('#datoTotal').text('Bs/'+total.toFixed(2))
    }else{
        $('#impuesto').val(0.00)
        $('#datoImpuesto').text('Bs/0.00')
        $('#total').val(0.00)
        $('#datoTotal').text('Bs/0.00')
    }
}
