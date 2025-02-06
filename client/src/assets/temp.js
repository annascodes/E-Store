<div>
    {
        placingProducts.length !== 0 && (
            placingProducts.map((p, indx) => {
                return (
                    <div className="border border-black my-2 p-0.5 text-sm">
                        {indx + 1}
                        {/* sizes   */}
                        <p className="text-center font-bold">size</p>
                        <div className="flex flex-row flex-wrap justify-around">
                            {product.size &&
                                product.size.map((c) => {
                                    return (
                                        <>
                                            <div className="  border-black p-1">
                                                <input type="radio" name={c} />
                                                <span className="ms-1">{c}</span>
                                            </div>
                                        </>
                                    );
                                })}

                            {/* --large  */}
                            {/* <div className="border border-black p-1">
                                            <input type="checkbox" name={p.product.name} />
                                            <span className="ms-1">L</span>
                                        </div> */}
                            {/* --medium  */}
                            {/* <div className="border border-black p-1">
                                             <input type="checkbox" name={p.product.name} />
                                             <span className="ms-1">M</span>
                                        </div> */}
                            {/* --small  */}
                            {/* <div className="border border-black p-1">
                                             <input type="checkbox" name={p.product.name} />
                                             <span className="ms-1">S</span>
                                        </div> */}
                        </div>
                        {/* colors  */}
                        <p className="text-center font-bold">color</p>
                        <div className="flex flex-row flex-wrap justify-around">
                            {product.color &&
                                product.color.map((c) => {
                                    return (
                                        <>
                                            <div className="  border-black p-1">
                                                <input type="radio" name={c} />
                                                <span style={{ backgroundColor: `${c}` }} className="ms-1 p-1 rounded-lg">{c}</span>
                                            </div>
                                        </>
                                    );
                                })}

                            {/* --large  */}
                            {/* <div className="border border-black p-1">
                                            <input type="checkbox" name={p.product.name} />
                                            <span className="ms-1">L</span>
                                        </div> */}
                            {/* --medium  */}
                            {/* <div className="border border-black p-1">
                                             <input type="checkbox" name={p.product.name} />
                                             <span className="ms-1">M</span>
                                        </div> */}
                            {/* --small  */}
                            {/* <div className="border border-black p-1">
                                             <input type="checkbox" name={p.product.name} />
                                             <span className="ms-1">S</span>
                                        </div> */}
                        </div>
                    </div>
                );
            })
        )
    }
</div>