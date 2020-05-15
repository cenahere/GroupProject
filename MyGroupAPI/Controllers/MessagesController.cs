using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("user/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        public MessagesController(IGroupRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var messageFromRepo = await _repo.GetMessage(id);
            if (messageFromRepo == null)
                return NotFound();
            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto messageForCreationDto)
        {
            var sender = await _repo.GetUser(userId);
            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            messageForCreationDto.SenderId = userId;
            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);
            if (recipient == null)
                return BadRequest("لم يتم الوصول للمرسل إليه");
            var message = _mapper.Map<Message>(messageForCreationDto);
            _repo.Add(message);
            if (await _repo.SaveAll())
            {
                var messageToReturn = _mapper.Map<MessageToReturnDto>(message);
                // حل مشكلة No Route باضافة ال userId,
                return CreatedAtRoute(nameof(GetMessage), new { userId, id = message.Id }, messageToReturn);
            }
            throw new Exception("حدثت مشكلة أثناء حفظ الرسالة الجديدة");
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, [FromQuery]MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            messageParams.UserId = userId;
            // جلب كل الرسائل
            var MessagesFromRepo = await _repo.GetMessagesForUser(messageParams);
            // الرسائل الراجعة
            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(MessagesFromRepo);
            Response.AddPagination(MessagesFromRepo.CurrentPage, MessagesFromRepo.PageSize, MessagesFromRepo.TotalCount, MessagesFromRepo.TotalPages);
            return Ok(messages);
        }

        [HttpGet("chat/{recipientId}")]
        public async Task<IActionResult> GetConverstion(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var messageFromRepo = await _repo.GetConverstion(userId, recipientId);
            var messageToReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messageFromRepo);
            return Ok(messageToReturn);

        }

        [HttpGet("count")]
        public async Task<IActionResult> GetUnreadMessagesForUser(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var count = await _repo.GetUreadMessagesForUser(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
            return Ok(count);
        }

        [HttpPost("read/{id}")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var message = await _repo.GetMessage(id);
            if (message.RecipientId != userId)
                return Unauthorized();
            message.IsRead = true;
            message.DateRead = DateTime.Now;
            await _repo.SaveAll();
            return NoContent();
        }

        [HttpPost("{id}")]
public async Task<IActionResult> DeleteMessage(int id , int userId)
{
        if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return  Unauthorized();
            var message=await _repo.GetMessage(id);
		// حذف الراسل 
            if(message.SenderId == userId)
                message.SenderDeleted=true;
            // حذف المرسل اليه 
            if(message.RecipientId==userId)
                message.RecipientDeleted=true;
            if(message.SenderDeleted && message.RecipientDeleted)
                _repo.Delete(message);
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception("خطأ في حذف الرساله");            
         }


    }


}