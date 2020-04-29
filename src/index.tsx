import React, { memo, useMemo, useState, useEffect, useRef, MutableRefObject } from "react"


interface IScrollContainer {
   scrollTop: number
   clientHeight: number
   addEventListener: any
   removeEventListener: any
}

const useRefListener = (): any => {
   const [scrollTop, setScrollTop] = useState(0)
   const [clientHeight, setClientHeight] = useState(0)
   const ref = useRef()

   const onScroll = (e: any) => {
      let isProcess = false      
      if (isProcess) return
      isProcess = true
      requestAnimationFrame(() => {
         setScrollTop(e.target.scrollTop)
         isProcess = false         
      })
   }

   const onResize = (e: any) => {
      let isProcess = false      
      if (isProcess) return
      isProcess = true      
      requestAnimationFrame(() => {
         setClientHeight(e.target.document.body.clientHeight)
         isProcess = false         
      })
   }

   useEffect(() => {
      const scrollRef: MutableRefObject<any> = ref
      const scrollContainer: IScrollContainer = scrollRef.current
      if (scrollContainer) {
         setScrollTop(scrollContainer.scrollTop)
         setClientHeight(scrollContainer.clientHeight)
         scrollContainer.addEventListener("scroll", onScroll)
         window.addEventListener("resize", onResize)
      }
      return () => {
         scrollContainer.removeEventListener("scroll", onScroll)
         window.removeEventListener("resize", onResize)
      }
   }, [])

   return [scrollTop, ref, clientHeight]
}


const VirtuList = ({ items, ...props }: any) => {
   const { children, height = "100%", width = "100%", itemHeight = 50, itemBuffer = 2 } = props
   const [scrollTop, ref, clientHeight] = useRefListener()
   const totalHeight = items.length * itemHeight
   const startItem = Math.max(0, Math.floor(scrollTop / itemHeight) - itemBuffer)
   const visibleItemCount = Math.min(items.length - startItem, Math.ceil(clientHeight / itemHeight) + 2 * itemBuffer)
   const offsetY = startItem * itemHeight   
   const visibleItems = useMemo(
      () => items.slice(startItem, (startItem + visibleItemCount)),
      [items, startItem, visibleItemCount]
   )

   return (
      <div className="react-virtuallist" style={{ height, width, overflow: "auto" }} ref={ref}>
         <div style={{ height: totalHeight, paddingTop: offsetY }}>
            {children({ indexStart: startItem, itemStyle: {height: itemHeight}, items: visibleItems, ...props })}
         </div>
      </div>
   )
}

export default memo(VirtuList)