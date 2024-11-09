export const findAll = `
    SELECT * FROM products;
`;

export const updateProducts = `
    UPDATE public.products
    SET nombre=$2, descripcion=$3, precio=$4, categoria=$5, imagen=$6
    WHERE id= $1;
`;

export const insertProducts = `
    INSERT INTO public.products
    (nombre, descripcion, precio, categoria, imagen)
    VALUES($1, $2, $3, $4, $5);
`

export const deleteProducts = `
    DELETE FROM public.products
    WHERE id=$1
`

