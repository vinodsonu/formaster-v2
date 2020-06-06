import React,{Component} from 'react';
import {observer} from 'mobx-react';
import {BsCaretLeftFill} from 'react-icons/bs';
import {AiFillCaretRight} from 'react-icons/ai';

import {
    Pagination,
    LeftArrow,
    RightArrow,
    CurrentPageNumber,
    TotalPages
} from './styledComponents';

@observer
class Paginator extends Component{
    render(){
        const {
            getNextForms,
            getPreviousForms,
            totalPagesCount,
            currentPage
        } = this.props;
        const isFirstPage = currentPage===1;
        const isLastPage = currentPage===totalPagesCount;
        return <Pagination>
                    <LeftArrow disabled={isFirstPage} onClick={getPreviousForms}>
                            <BsCaretLeftFill/>
                    </LeftArrow>
                    <TotalPages>
                        {`${currentPage} / ${totalPagesCount}`}
                    </TotalPages>
                    <RightArrow disabled={isLastPage} onClick={getNextForms}>
                            <AiFillCaretRight/>
                    </RightArrow>
                </Pagination>
    }
}

export {Paginator}