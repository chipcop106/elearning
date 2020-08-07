import React from 'react';
import ReactDOM from 'react-dom';
import { randomId } from "~src/utils";
import TeacherSupportModal from "~components/TeacherSupportModal"
import { ToastContainer } from 'react-toastify';
import SupportDetail from './SupportDetail';
import styles from "~components/TeacherSupport/teacherSupport.module.scss"
import { getListSupport, getOverviewSupport } from '~src/api/teacherAPI';
import Pagination from 'react-js-pagination';
import Skeleton from 'react-loading-skeleton';
import { Filter } from 'styled-icons/ionicons-solid';

const TeacherSupport = () => {
	const [state, setState] = React.useState([]);
	const [filterState, setFilterState] = React.useState([]);
	const [overView, setOverView] = React.useState(null);
	const [filter, setFilter] = React.useState(0);
	const [showDetail, setShowDetail] = React.useState(false);
	const [detailId, setDetailId] = React.useState(0);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [isLoading, setIsLoading] = React.useState(true);
	const [pageSize, setPageSize] = React.useState(0);
	const [totalResult, setTotalResult] = React.useState(0);

	const onChangeState = () => {
		setIsLoading(true);
		if(filter === 0){
			setFilterState([...state]);
			setIsLoading(false);
			return;
		} 
		const newFilterState = [...state].filter(item => item.STATUS === filter);
		setFilterState(newFilterState);
		setIsLoading(false);
		
	}

	const pushHistoryState = (id) => {
		if (typeof window == undefined) return;
		const history = window.history;
		history.pushState({ id: id }, 'Ticket detail', `${window.location.pathname}?id=${id}`);
	}

	const showDetailBox = (id) => {
		setDetailId(id)
		pushHistoryState(id)
		setShowDetail(true);
	}

	const _handlefilter = (index) => {
		showDetail && hideDetailBox();
		setFilter(index);
	}

	const hideDetailBox = () => {
		setShowDetail(false);
		window.history.pushState(null, 'Teacher Support', `${window.location.pathname}`);
	}

	const checkDetailUrl = () => {
		if (typeof window == undefined) return;
		const params = new URLSearchParams(window.location.search);
		params.has('id') && showDetailBox(params.get('id'));
	}

	const getSupportList = async () => {
		setIsLoading(true);
		try {
			const res = await getListSupport({
				Status: parseInt(filter),
				Page: parseInt(pageNumber)
			});
			if (res.Code === 1) {
				setState(res.Data);
				setPageSize(res.PageSize);
				setTotalResult(res.TotalResult);
			}

		} catch (error) {
			console.log(error?.message ?? 'Call api getListSupport không thành công');
		}
		setIsLoading(false);
	}

	const refreshList = async () => {
		await getSupportList();
		await getOverView();
	}

	const getOverView = async () => {
		try {
			const res = await getOverviewSupport();
			res.Code === 1 && setOverView(res.Data);
		} catch (error) {
			console.log(error?.message ?? 'Call api SupportOverview không thành công');
		}
	}

	const afterCancelSuccess = (ID) =>{
		console.log(ID);
		setFilterState([...state.map(item => item.ID === ID ? {
			...item,
			STATUS: 4
		} : item )]);
		hideDetailBox();
	}

	React.useEffect(() => {
		onChangeState();
	},[state, filter])

	React.useEffect(() => {
		getSupportList();
	}, [pageNumber]);

	React.useEffect(() => {
		getOverView();
		checkDetailUrl();
	}, []);

	return (
		<div className="sup">
			<div className="d-md-flex justify-content-between align-items-center mg-b-30">
				<h3 className="tx-bold tx-dark mg-md-b-0">Support Center</h3>
				<button type="button" className="btn btn-primary"
					data-toggle="modal"
					data-target="#md-teacher-support"
					id="contactsub"><i className="fa fa-plus mg-r-10"></i>Ticket</button>
			</div>

			<div className="row">
				<div className="col-md-4">
					<div className="card card-custom">
						<div className="sub-menu card-body">
							<p className={`${filter === 0 && 'active'} d-flex align-items-center justify-content-between`}>
								<a className="link" onClick={() => _handlefilter(0)}>Tất Cả</a>
								<span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">{overView?.All ?? 0}</span>
							</p>

							<p className={`${filter === 1 && 'active'} d-flex align-items-center justify-content-between`}>
								<a className="link" onClick={() => _handlefilter(1)}>Mới tạo</a>
								<span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">{overView?.News ?? 0}</span>
							</p>
							<p className={`${filter === 2 && 'active'} d-flex align-items-center justify-content-between`}>
								<a className="link" onClick={() => _handlefilter(2)}>Đang xử lý</a>
								<span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">{overView?.Processing ?? 0}</span>
							</p>
							<p className={`${filter === 3 && 'active'} d-flex align-items-center justify-content-between`}>
								<a className="link" onClick={() => _handlefilter(3)}>Đã xử lý</a>
								<span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">{overView?.Answered ?? 0}</span>
							</p>
							<p className={`${filter === 4 && 'active'} d-flex align-items-center justify-content-between`}>
								<a className="link" onClick={() => _handlefilter(4)}>Đã hủy</a>
								<span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">{overView?.Cancelled ?? 0}</span>
							</p>
						</div>
					</div>
				</div>
				<div className="col-md-8">
					<div className="card card-custom">
						<div className="card-body">
							{showDetail ? <SupportDetail
								onClickBack={hideDetailBox}
								detailId={detailId}
								afterCancelSuccess={afterCancelSuccess}
							/> : (
									<>
										<div className="table-responsive mg-b-15">
											<table className="table table-borderless table-hover">
												<thead className="thead-primary">
													<tr>
														<th>Tiêu đề</th>
														<th>Ngày gửi</th>
														<th>Trạng thái</th>
													</tr>
												</thead>
												<tbody>
													{isLoading ? (<tr><td><Skeleton /></td><td><Skeleton /></td><td><Skeleton /></td></tr>) : (
														!!filterState && filterState.length > 0 ? filterState.map(item =>
															<tr key={`${item.ID}`}>
																<td> <span><a href="#" onClick={() => showDetailBox(item.ID)} className="sup-item-table-tieude">{item.SupportTitle}</a></span><br /></td>
																<td>
																	<span className="sup-item-table-gio">{moment(item.CreatedDate).format("DD/MM/YYYY")}</span> <br />
																</td>
																<td>
																	<span className={`badge badge-${
																		item.STATUS === 1 ? 'info' :
																			item.STATUS === 2 ? "warning" :
																				item.STATUS === 3 ? "success" : "danger"} pd-5 tx-12 wd-75`}>
																		{
																			item.STATUS === 1 ? "Mới tạo" :
																				item.STATUS === 2 ? "Đang xử lý" :
																					item.STATUS === 3 ? "Đã xử lý" : "Đã hủy"
																		}
																	</span>
																</td>
															</tr>) : (
																<tr key={`${randomId}`}>
																	<td  colSpan={3} className="tx-center">
																		<span className="tx-bold tx-danger">No support ticket</span>
																	</td>
																</tr>
															)
													)}
												</tbody>
											</table>
										</div>

										{totalResult > pageSize && (
											<Pagination
												innerClass="pagination"
												activePage={pageNumber}
												itemsCountPerPage={pageSize}
												totalItemsCount={totalResult}
												pageRangeDisplayed={5}
												onChange={(page) => setPageNumber(page)}
												itemClass="page-item"
												linkClass="page-link"
												activeClass="active"
											/>
										)}
									</>
								)
							}


						</div>
					</div>
				</div>
			</div>

			<TeacherSupportModal refreshList={refreshList}/>
			<ToastContainer />
		</div>
	)
}

const domContainer = document.getElementById('react-teacher-support');
ReactDOM.render(<TeacherSupport />, domContainer);