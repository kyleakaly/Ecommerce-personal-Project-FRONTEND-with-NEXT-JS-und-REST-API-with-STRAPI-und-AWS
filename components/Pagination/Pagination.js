import React from 'react'
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from 'next/router'
import queryString from "query-string";



const Pagination = ({obtenernumerodelJuegos,page,limitperpage}) => {

    const router = useRouter()
    const totalPages = Math.ceil(obtenernumerodelJuegos / limitperpage)
    console.log(totalPages)
    const urlParse = queryString.parseUrl(router.asPath);


    const irAPagina = (nuevaPagina) => {
urlParse.query.page = nuevaPagina;

const url = queryString.stringifyUrl(urlParse);
router.push(url)
    }

  return (
    <div className='pagination'>
        <PaginationSU
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_,data )=>irAPagina(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
        />
    </div>
  )
}

export default Pagination