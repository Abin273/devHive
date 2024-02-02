import React from 'react'

const ChatBoxTopBar: React.FC<{ receiver: any, isOnline: any }> = ({ receiver, isOnline })=> {
  return (
    <div>
      	<div className="card w-full bg-base-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-1">
			<div className="flex flex-row p-4 gap-3 items-center ">
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle avatar"
				>
					<div className="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						/>
					</div>
				</div>
				<div className="flex flex-row w-full justify-between">
					<h5>{receiver}</h5>
					<p>{isOnline ? "online" : "offline"}</p>
				</div>
			</div>
		</div>
    </div>
  )
}

export default ChatBoxTopBar
